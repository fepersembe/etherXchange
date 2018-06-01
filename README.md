# CmpE492
Furkan&amp;Ceyhun's 492 project

[![etherXchange](https://github.com/fepersembe/CmpE492/blob/master/website/etherxchange.png
)](https://github.com/fepersembe/CmpE492)

##### Contract Ropsten Address: 0xEdF33bf9673D2Fac693439beFA319EC9d72552c9

# Objective of the project
- Main aim of the project is to provide financial currency exchange data to private Boğaziçi eBloc Ethereum Network.
- Smart contracts cannot get data from out of its network, so any smart contract in eBloc network can use our smart contract to use current data of TCMB and ECB exchange rates.

## What is done in this project
- In this project we craeted smart contract in both:
    * eBloc Network
    * Ropspen Test Network
- We crawled publicly available exchange rates data from ECB(European Central Bank) and TCMB(Türkiye Cumhuriyeti Merkez Bankası) websites
- We send data to these smart contracts:
    * ECB data is available from 04-01-1999
    * TCMB data will available from 1993, currently just current week is available
- We created user interface in order to serve these data without running a node and not conflicting with network properties by using Metamask accounts in Ropspen network
    * Any person who has Metamask account can use our website to see what is in our smart conract
    * **Website** : [http://206.189.50.22:8081/exchange.html](http://206.189.50.22:8081/exchange.html)

## In our user interface you can do:
- Yu can get currency data from our smart contract by selecting date by date picker
- You can convert available currenncies between each other


# Our Smart Contract: CurrencyHub
- Our smart contract is publicly available
- Data can be loaded to our smart contract with the given address only from its owner, we!
- We used unixtime, as it called epoch time in our smart contract.
- If anyone want to reach a past data in our contrac, s/he can give unix time parameter in that day in any hour. For example corresponded unix time integer of 00:00 to 23:59 is acceptable for the day wanted.
- Our GET functions clears the hours of given unix time with the formula :
```
given_unix_time - given_unix_time %86400
```
- 1 day correspondes to 86400 seconds
- Our smart contract accepts only integer value for time parameters, miliseconds should not be given


## Floating point challenge
- Exchange rate values are all decimal numbers.
- Soldity has no floating point type data structure
- Our solution is:
    * We multiplied all values with 10^9
    * We keep data in our smart contract with this multiplied version.
- **Important Remark**: *Anyone who gets a value from our smart contract with get or convert functions, should divide result to the 10^9*


## Functions:
| Function Name | Parameters | Description
| ------ | ------ | ------ |
| isTodayAvailable | () | returns: True or False, if today's data is available it returns True
| isAvailable | (uint _epoch_time) | returns: True or False, if given unix time available it returns True. Example:```isAvailable(1527552000): True``` |
| get_tcmb_forexbuying |(uint256 _epoch_time, bytes3 _curr_code)| returns: value that multiplied with 10^9. Example: get_tcmb_forexbuying(1527552000, "USD")|
| get_ecb |(uint256 _epoch_time, bytes3 _curr_code)| returns: value that multiplied with 10^9. Example: ```get_ecb(1527552000, "USD") : 1164400000```|
| get_tcmb_forexbuying |(uint256 _epoch_time, bytes3 _curr_code)| returns: value that multiplied with 10^9. Example: ```get_tcmb_forexbuying(1527552000, "USD")```|
| get_tcmb_forexselling |(uint256 _epoch_time, bytes3 _curr_code)| returns: value that multiplied with 10^9. Example: ```get_tcmb_forexselling(1527552000, "USD")```|



## Contract Call from other contract example:
* Contract address is given above.
* ABI of the contrac can be used or contract can be compiled together with the caller contract
* For example:
```
CurrencyHub{
......
.....
}
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
```
![Image of Caller Contract](https://github.com/fepersembe/CmpE492/blob/master/website/caller_example.png)
