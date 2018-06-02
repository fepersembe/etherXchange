pragma solidity ^0.4.20;

contract CurrencyHub {
    mapping(uint256 => mapping(bytes3 => uint)) TCMB_forexbuying;
    mapping(uint256 => mapping(bytes3 => uint)) TCMB_forexselling;
    mapping(uint256 => mapping(bytes3 => uint)) ECB;

    address public owner = msg.sender;

    function isTodayAvailable() public returns(bool){
        uint time = unixtime(now);
        uint val = get_ecb(time,"USD");
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

    function add_tcmb_forexbuying(uint256 _epoch_time, bytes3 _curr_code, uint _value) public {    
        require(msg.sender == owner);
        TCMB_forexbuying[_epoch_time][_curr_code] = _value;
    }

    function get_tcmb_forexbuying(uint256 _epoch_time, bytes3 _curr_code) public view returns(uint) {
        return TCMB_forexbuying[unixtime(_epoch_time)][_curr_code];
    }

    function add_tcmb_forexselling(uint256 _epoch_time, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        TCMB_forexselling[_epoch_time][_curr_code] = _value;
    }

    function get_tcmb_forexselling(uint256 _epoch_time, bytes3 _curr_code) public view returns(uint) {
        return TCMB_forexselling[unixtime(_epoch_time)][_curr_code];
    }

    

    function add_ecb(uint256 _epoch_time, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        ECB[_epoch_time][_curr_code] = _value;
    }
    
    function get_ecb(uint256 _epoch_time, bytes3 _curr_code) public view returns(uint) {
        return ECB[unixtime(_epoch_time)][_curr_code];
    }



    function convert_x_to_y_tcmb_forexbuying(uint256 _epoch_time, bytes3 _x, bytes3 _y) public view returns(uint) {
        return (TCMB_forexbuying[unixtime(_epoch_time)][_x] * 1000000000) / TCMB_forexbuying[unixtime(_epoch_time)][_y];
    }

    function convert_x_to_y_tcmb_forexselling(uint256 _epoch_time, bytes3 _x, bytes3 _y) public view returns(uint) {
        return (TCMB_forexselling[unixtime(_epoch_time)][_x] * 1000000000) / TCMB_forexselling[unixtime(_epoch_time)][_y];
    }

    function convert_x_to_y_tcmb_banknotebuying(uint256 _epoch_time, bytes3 _x, bytes3 _y) public view returns(uint) {
        return (TCMB_banknotebuying[unixtime(_epoch_time)][_x] * 1000000000) / TCMB_banknotebuying[unixtime(_epoch_time)][_y];
    }

    function convert_x_to_y_tcmb_banknoteselling(uint256 _epoch_time, bytes3 _x, bytes3 _y) public view returns(uint) {
        return (TCMB_banknoteselling[unixtime(_epoch_time)][_x] * 1000000000) / TCMB_banknoteselling[unixtime(_epoch_time)][_y];
    }


    function convert_x_to_y_ecb(uint256 _epoch_time, bytes3 _x, bytes3 _y) public view returns(uint) {
        return (ECB[unixtime(_epoch_time)][_x] * 1000000000) / ECB[unixtime(_epoch_time)][_y];
    }

}




