pragma solidity ^0.4.20;
contract CurrencyHub {
    //Year, month, _day, currency code
    // All below is 1 X is how much TRY in TCMB data.
    mapping(uint16 => mapping(uint8 => mapping(uint8 => mapping(bytes3 => uint)))) TCMB_forexbuying;
    mapping(uint16 => mapping(uint8 => mapping(uint8 => mapping(bytes3 => uint)))) TCMB_forexselling;
    mapping(uint16 => mapping(uint8 => mapping(uint8 => mapping(bytes3 => uint)))) TCMB_banknotebuying;
    mapping(uint16 => mapping(uint8 => mapping(uint8 => mapping(bytes3 => uint)))) TCMB_banknoteselling;
    mapping(uint16 => mapping(uint8 => mapping(uint8 => mapping(bytes3 => uint)))) TCMB_crossrateusd;

    // 1 Euro is X unit of sthing in ECB data.
    mapping(uint16 => mapping(uint8 => mapping(uint8 => mapping(bytes3 => uint)))) ECB;
    // 1 Dollar is X unit of sthing in ECB data
    mapping(uint16 => mapping(uint8 => mapping(uint8 => mapping(bytes3 => uint)))) ECB_usd;
    
    address public owner = msg.sender;
    
    // 1-) TCMB Forex Buying
    function add_tcmb_forexbuying(uint16 _year, uint8 _month, uint8 _day, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        TCMB_forexbuying[_year][_month][_day][_curr_code] = _value;
    }
    //X unit is how much TRY in TCMB ForexBuying data
    function get_tcmb_forexbuying(uint16 _year, uint8 _month, uint8 _day, bytes3 _curr_code) public view returns(uint) {
        return TCMB_forexbuying[_year][_month][_day][_curr_code];
    }
    // 2-) TCMB Forex Selling
    function add_tcmb_forexselling(uint16 _year, uint8 _month, uint8 _day, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        TCMB_forexselling[_year][_month][_day][_curr_code] = _value;
    }
    //X unit is how much TRY in TCMB ForexSelling data
    function get_tcmb_forexselling(uint16 _year, uint8 _month, uint8 _day, bytes3 _curr_code) public view returns(uint) {
        return TCMB_forexselling[_year][_month][_day][_curr_code];
    }

    // 3-) TCMB Banknote Buying
    function add_tcmb_banknotebuying(uint16 _year, uint8 _month, uint8 _day, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        TCMB_banknotebuying[_year][_month][_day][_curr_code] = _value;
    }
    //X unit is how much TRY in TCMB BanknoteBuying data
    function get_tcmb_banknotebuying(uint16 _year, uint8 _month, uint8 _day, bytes3 _curr_code) public view returns(uint) {
        return TCMB_banknotebuying[_year][_month][_day][_curr_code];
    }

    // 4-) TCMB Banknote Selling
    function add_tcmb_banknoteselling(uint16 _year, uint8 _month, uint8 _day, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        TCMB_banknoteselling[_year][_month][_day][_curr_code] = _value;
    }
    //X unit is how much TRY in TCMB BanknoteSelling data
    function get_tcmb_banknoteselling(uint16 _year, uint8 _month, uint8 _day, bytes3 _curr_code) public view returns(uint) {
        return TCMB_banknoteselling[_year][_month][_day][_curr_code];
    }
    
    // 5-) TCMB Cross Rate
    function add_tcmb_crossrateusd(uint16 _year, uint8 _month, uint8 _day, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        TCMB_crossrateusd[_year][_month][_day][_curr_code] = _value;
    }
    //X unit is how much TRY in TCMB CrossRate data
    function get_tcmb_crossrateusd(uint16 _year, uint8 _month, uint8 _day, bytes3 _curr_code) public view returns(uint) {
        return TCMB_crossrateusd[_year][_month][_day][_curr_code];
    }

    // 6-) ECB Euro unit base: 1 EUR is how much X unit
    function add_ecb(uint16 _year, uint8 _month, uint8 _day, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        ECB[_year][_month][_day][_curr_code] = _value;
    }
    function get_ecb(uint16 _year, uint8 _month, uint8 _day, bytes3 _curr_code) public view returns(uint) {
        return ECB[_year][_month][_day][_curr_code];
    }

    // 7-) ECB Dollar unit base: 1 USD is how much X unit
    function add_ecb_usd(uint16 _year, uint8 _month, uint8 _day, bytes3 _curr_code, uint _value) public{    
        require(msg.sender == owner);
        ECB_usd[_year][_month][_day][_curr_code] = _value;
    }
    function get_ecb_usd(uint16 _year, uint8 _month, uint8 _day, bytes3 _curr_code) public view returns(uint) {
        return ECB_usd[_year][_month][_day][_curr_code];
    }

    // TCMB_forexbuying conversion
    function convert_x_to_y_tcmb_forexbuying(uint16 _year, uint8 _month, uint8 _day, bytes3 _x, bytes3 _y) public view returns(uint) {
        //Value is multiplied by 10^9, should be divided to 10^9.
        return (TCMB_forexbuying[_year][_month][_day][_x] * 1000000000) / TCMB_forexbuying[_year][_month][_day][_y];
    }

    // TCMB_forexselling conversion
    function convert_x_to_y_tcmb_forexselling(uint16 _year, uint8 _month, uint8 _day, bytes3 _x, bytes3 _y) public view returns(uint) {
        //Value is multiplied by 10^9, should be divided to 10^9.
        return (TCMB_forexselling[_year][_month][_day][_x] * 1000000000) / TCMB_forexselling[_year][_month][_day][_y];
    }

    // TCMB_banknotebuying conversion
    function convert_x_to_y_tcmb_banknotebuying(uint16 _year, uint8 _month, uint8 _day, bytes3 _x, bytes3 _y) public view returns(uint) {
        //Value is multiplied by 10^9, should be divided to 10^9.
        return (TCMB_banknotebuying[_year][_month][_day][_x] * 1000000000) / TCMB_banknotebuying[_year][_month][_day][_y];
    }

    // TCMB_banknoteselling conversion
    function convert_x_to_y_tcmb_banknoteselling(uint16 _year, uint8 _month, uint8 _day, bytes3 _x, bytes3 _y) public view returns(uint) {
        //Value is multiplied by 10^9, should be divided to 10^9.
        return (TCMB_banknoteselling[_year][_month][_day][_x] * 1000000000) / TCMB_banknoteselling[_year][_month][_day][_y];
    }

    // TCMB_crossrateusd conversion
    // Exact match: 1 USD is X unit of something.
    function convert_x_to_y_tcmb_crossrateusd(uint16 _year, uint8 _month, uint8 _day, bytes3 _x, bytes3 _y) public view returns(uint) {
        //Value is multiplied by 10^9, should be divided to 10^9.
        return (TCMB_crossrateusd[_year][_month][_day][_x] * 1000000000) / TCMB_crossrateusd[_year][_month][_day][_y];
    }

    // ECB Euro base conversion
    // Exact match is: 1 EUR is X unit of something
    function convert_x_to_y_ecb(uint16 _year, uint8 _month, uint8 _day, bytes3 _x, bytes3 _y) public view returns(uint) {
        //Value is multiplied by 10^9, should be divided to 10^9.
        return (ECB[_year][_month][_day][_x] * 1000000000) / ECB[_year][_month][_day][_y];
    }

    // ECB Dollar base conversion
    // May be not necessary :)
    function convert_x_to_y_ecb_usd(uint16 _year, uint8 _month, uint8 _day, bytes3 _x, bytes3 _y) public view returns(uint) {
        //Value is multiplied by 10^9, should be divided to 10^9.
        return (ECB_usd[_year][_month][_day][_x] * 1000000000) / ECB_usd[_year][_month][_day][_y];
    }
}




