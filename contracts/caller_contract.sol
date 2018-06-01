pragma solidity ^0.4.20;
contract CallerContract  {
    
    CurrencyHub ch;
    uint _zero = 0;
    
    function CallerContract(address _t) public {
        ch = CurrencyHub(_t);
    }
 
    function getEcbUSDToday() public view returns (uint result) {
        if(ch.isTodayAvailable()){
            return ch.get_ecb(now, "USD");
        }else{
            return ch.get_ecb((now - 1 days), "USD");
        }
    }
    
    function getEcbUSD(uint _epoch_time) public view returns (uint result) {
        if(ch.isAvailable(_epoch_time)){
            return ch.get_ecb(_epoch_time, "USD");
        }else{
            return _zero;
        }
    }
    
}


contract CurrencyHub {
    
    // Attantion for date time:
    //      - Epoch time is always 12:00 PM, middle of the day for a past day.
    //      - We should send data always after 12:00PM for all days


    
    //Epoch time, currency code
    // All below is 1 X is how much TRY in TCMB data.
    mapping(uint256 => mapping(bytes3 => uint)) TCMB_forexbuying;
    mapping(uint256 => mapping(bytes3 => uint)) TCMB_forexselling;
    mapping(uint256 => mapping(bytes3 => uint)) TCMB_banknotebuying;
    mapping(uint256 => mapping(bytes3 => uint)) TCMB_banknoteselling;
    mapping(uint256 => mapping(bytes3 => uint)) TCMB_crossrateusd;

    // 1 Euro is X unit of sthing in ECB data.
    mapping(uint256 => mapping(bytes3 => uint)) ECB;
    // 1 Dollar is X unit of sthing in ECB data
    mapping(uint256 => mapping(bytes3 => uint)) ECB_usd;
    
    address public owner = msg.sender;
    //event Msg1(string m,uint n,uint t);
    // Unix epoch time conversion

    function isTodayAvailable() public returns(bool){
        uint time = unixtime(now);
        uint val = get_ecb(time,"USD");
        //emit Msg1("Value, Time",val,time);
        if(val == 0){
            return false;
        }
        return true;
    }
    function isAvailable(uint _epoch_time) public returns(bool){
        uint time = unixtime(_epoch_time);
        uint val = get_ecb(time, "USD");
        if(val == 0){
            return false;
        }
        return true;
    }

    function unixtime (uint256 in_time) internal pure returns( uint256 ){
        return (in_time - (in_time % 86400));
    }

    // 1-) TCMB Forex Buying
    function add_tcmb_forexbuying(uint256 _epoch_time, bytes3 _curr_code, uint _value) public {    
        require(msg.sender == owner);
        TCMB_forexbuying[_epoch_time][_curr_code] = _value;
    }
    //X unit is how much TRY in TCMB ForexBuying data
    function get_tcmb_forexbuying(uint256 _epoch_time, bytes3 _curr_code) public view returns(uint) {
        return TCMB_forexbuying[unixtime(_epoch_time)][_curr_code];
    }
    // 2-) TCMB Forex Selling
    function add_tcmb_forexselling(uint256 _epoch_time, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        TCMB_forexselling[_epoch_time][_curr_code] = _value;
    }
    //X unit is how much TRY in TCMB ForexSelling data
    function get_tcmb_forexselling(uint256 _epoch_time, bytes3 _curr_code) public view returns(uint) {
        return TCMB_forexselling[unixtime(_epoch_time)][_curr_code];
    }

    // 3-) TCMB Banknote Buying
    function add_tcmb_banknotebuying(uint256 _epoch_time, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        TCMB_banknotebuying[_epoch_time][_curr_code] = _value;
    }
    //X unit is how much TRY in TCMB BanknoteBuying data
    function get_tcmb_banknotebuying(uint256 _epoch_time, bytes3 _curr_code) public view returns(uint) {
        return TCMB_banknotebuying[unixtime(_epoch_time)][_curr_code];
    }

    // 4-) TCMB Banknote Selling
    function add_tcmb_banknoteselling(uint256 _epoch_time, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        TCMB_banknoteselling[_epoch_time][_curr_code] = _value;
    }
    //X unit is how much TRY in TCMB BanknoteSelling data
    function get_tcmb_banknoteselling(uint256 _epoch_time, bytes3 _curr_code) public view returns(uint) {
        return TCMB_banknoteselling[unixtime(_epoch_time)][_curr_code];
    }
    
    // 5-) TCMB Cross Rate
    function add_tcmb_crossrateusd(uint256 _epoch_time, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        TCMB_crossrateusd[_epoch_time][_curr_code] = _value;
    }
    //X unit is how much TRY in TCMB CrossRate data
    function get_tcmb_crossrateusd(uint256 _epoch_time, bytes3 _curr_code) public view returns(uint) {
        return TCMB_crossrateusd[unixtime(_epoch_time)][_curr_code];
    }

    // 6-) ECB Euro unit base: 1 EUR is how much X unit
    function add_ecb(uint256 _epoch_time, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        ECB[_epoch_time][_curr_code] = _value;
    }
    function get_ecb(uint256 _epoch_time, bytes3 _curr_code) public view returns(uint) {
        return ECB[unixtime(_epoch_time)][_curr_code];
    }

    // 7-) ECB Dollar unit base: 1 USD is how much X unit
    function add_ecb_usd(uint256 _epoch_time, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        ECB_usd[_epoch_time][_curr_code] = _value;
    }
    function get_ecb_usd(uint256 _epoch_time, bytes3 _curr_code) public view returns(uint) {
        return ECB_usd[unixtime(_epoch_time)][_curr_code];
    }










    // TCMB_forexbuying conversion
    function convert_x_to_y_tcmb_forexbuying(uint256 _epoch_time, bytes3 _x, bytes3 _y) public view returns(uint) {
        //Value is multiplied by 10^9, should be divided to 10^9.
        return (TCMB_forexbuying[unixtime(_epoch_time)][_x] * 1000000000) / TCMB_forexbuying[unixtime(_epoch_time)][_y];
    }

    // TCMB_forexselling conversion
    function convert_x_to_y_tcmb_forexselling(uint256 _epoch_time, bytes3 _x, bytes3 _y) public view returns(uint) {
        //Value is multiplied by 10^9, should be divided to 10^9.
        return (TCMB_forexselling[unixtime(_epoch_time)][_x] * 1000000000) / TCMB_forexselling[unixtime(_epoch_time)][_y];
    }

    // TCMB_banknotebuying conversion
    function convert_x_to_y_tcmb_banknotebuying(uint256 _epoch_time, bytes3 _x, bytes3 _y) public view returns(uint) {
        //Value is multiplied by 10^9, should be divided to 10^9.
        return (TCMB_banknotebuying[unixtime(_epoch_time)][_x] * 1000000000) / TCMB_banknotebuying[unixtime(_epoch_time)][_y];
    }

    // TCMB_banknoteselling conversion
    function convert_x_to_y_tcmb_banknoteselling(uint256 _epoch_time, bytes3 _x, bytes3 _y) public view returns(uint) {
        //Value is multiplied by 10^9, should be divided to 10^9.
        return (TCMB_banknoteselling[unixtime(_epoch_time)][_x] * 1000000000) / TCMB_banknoteselling[unixtime(_epoch_time)][_y];
    }

    // TCMB_crossrateusd conversion
    // Exact match: 1 USD is X unit of something.
    function convert_x_to_y_tcmb_crossrateusd(uint256 _epoch_time, bytes3 _x, bytes3 _y) public view returns(uint) {
        //Value is multiplied by 10^9, should be divided to 10^9.
        return (TCMB_crossrateusd[unixtime(_epoch_time)][_x] * 1000000000) / TCMB_crossrateusd[unixtime(_epoch_time)][_y];
    }

    // ECB Euro base conversion
    // Exact match is: 1 EUR is X unit of something
    function convert_x_to_y_ecb(uint256 _epoch_time, bytes3 _x, bytes3 _y) public view returns(uint) {
        //Value is multiplied by 10^9, should be divided to 10^9.
        return (ECB[unixtime(_epoch_time)][_x] * 1000000000) / ECB[unixtime(_epoch_time)][_y];
    }

    // ECB Dollar base conversion
    // May be not necessary :)
    function convert_x_to_y_ecb_usd(uint256 _epoch_time, bytes3 _x, bytes3 _y) public view returns(uint) {
        //Value is multiplied by 10^9, should be divided to 10^9.
        return (ECB_usd[unixtime(_epoch_time)][_x] * 1000000000) / ECB_usd[unixtime(_epoch_time)][_y];
    }
}