    //GLOBAL VARIABLES
    var HOUR = 0;
    var SECONDS_IN_A_DAY = 86400;
    var isFirstRun = true;
    // Address of the contact
    var contractaddress = "0xedf33bf9673d2fac693439befa319ec9d72552c9";
    // ABI of the contract
    var abi = [{"constant":false,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_curr_code","type":"bytes3"},{"name":"_value","type":"uint256"}],"name":"add_ecb","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_curr_code","type":"bytes3"},{"name":"_value","type":"uint256"}],"name":"add_ecb_usd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_curr_code","type":"bytes3"},{"name":"_value","type":"uint256"}],"name":"add_tcmb_banknotebuying","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_curr_code","type":"bytes3"},{"name":"_value","type":"uint256"}],"name":"add_tcmb_banknoteselling","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_curr_code","type":"bytes3"},{"name":"_value","type":"uint256"}],"name":"add_tcmb_crossrateusd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_curr_code","type":"bytes3"},{"name":"_value","type":"uint256"}],"name":"add_tcmb_forexbuying","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_curr_code","type":"bytes3"},{"name":"_value","type":"uint256"}],"name":"add_tcmb_forexselling","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_epoch_time","type":"uint256"}],"name":"isAvailable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"isTodayAvailable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_x","type":"bytes3"},{"name":"_y","type":"bytes3"}],"name":"convert_x_to_y_ecb","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_x","type":"bytes3"},{"name":"_y","type":"bytes3"}],"name":"convert_x_to_y_ecb_usd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_x","type":"bytes3"},{"name":"_y","type":"bytes3"}],"name":"convert_x_to_y_tcmb_banknotebuying","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_x","type":"bytes3"},{"name":"_y","type":"bytes3"}],"name":"convert_x_to_y_tcmb_banknoteselling","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_x","type":"bytes3"},{"name":"_y","type":"bytes3"}],"name":"convert_x_to_y_tcmb_crossrateusd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_x","type":"bytes3"},{"name":"_y","type":"bytes3"}],"name":"convert_x_to_y_tcmb_forexbuying","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_x","type":"bytes3"},{"name":"_y","type":"bytes3"}],"name":"convert_x_to_y_tcmb_forexselling","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_curr_code","type":"bytes3"}],"name":"get_ecb","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_curr_code","type":"bytes3"}],"name":"get_ecb_usd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_curr_code","type":"bytes3"}],"name":"get_tcmb_banknotebuying","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_curr_code","type":"bytes3"}],"name":"get_tcmb_banknoteselling","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_curr_code","type":"bytes3"}],"name":"get_tcmb_crossrateusd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_curr_code","type":"bytes3"}],"name":"get_tcmb_forexbuying","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_epoch_time","type":"uint256"},{"name":"_curr_code","type":"bytes3"}],"name":"get_tcmb_forexselling","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
    //3-letter currency codes and currency Name Arrays
    var currencies = ["EUR","USD","TRY","GBP","BGN","CHF","CNY","DKK","AUD","SEK","CAD","NOK","JPY","RON","RUB","KWD","SAR","IRR","PKR","CZK","HUF","PLN","ISK","HRK","BRL","HKD","IDR","ILS","INR","KRW","MXN","MYR","NZD","PHP","SGD","THB","ZAR"];    var ecbcurrencies = [];
    var currencyNames = ["Euro","US Dollar","Turkish Lira","Pound Sterling","Bulgarian Lev","Swiss Franc","Chinese Yuan Renminbi","Danish Krone","Australian Dollar","Swedish Krona","Canadian Dollar","Norwegian Krone","Japanese Yen","Romanian Leu","Russian Rouble","Kuwaiti Dinar","Saudi Arabian Riyal","Iranian Rial","Pakistani Rupee","Czech Koruna","Hungarian Forint","Polish Zloty","Icelandic Krona","Crotian Kuna","Brazilian Real","Hong Kong Dollar","Indonesian Rupiah","Israeli Shekel","Indian Rupee","South Korean Won","Mexican Peso","Malaysian Ringgit","New Zealand Dollar","Philippine Piso","Singapore Dollar","Thai Baht","South African Rand"];
    
    //Add Metamask for further transactions
    window.addEventListener('load', function() {

        // We use Metamask web3
        var web3 = window.web3;
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider
            web3js = new Web3(web3.currentProvider);
        } else {
            console.log('No web3? You should consider trying MetaMask!')
            alert('No web3? You should consider trying MetaMask!');
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            web3js = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
    });

    //Convert string to Hex
    function convertToHex(str) {
        var hex = '';
        for(var i=0;i<str.length;i++) {
            hex += ''+str.charCodeAt(i).toString(16);
        }
        return "0x" + hex;
    }

    //Return date as DD-MM-YYYY string
    function stringFromDate(date){
        return date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
    }

    //Return epoch time as DD-MM-YYYY string
    function stringFromEpochTime(epochtime){
        return stringFromDate(new Date(epochtime*1e3));
    }

    //Called just before page loads
    function onStart() {
        changeCurrencies();
        setToday();
    }

    function delay(t) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, t)
        });
    }

    // Re-arrange de currency dropdowns for chosen bank
    function changeCurrencies() {
        // Define variables
        var currencyFrom = document.getElementById("currencyFrom");
        var currencyTo = document.getElementById("currencyTo");
        var currencyType = document.getElementById("currencyType");
        var currencyFromBottom = document.getElementById("currencyFromBottom");
        var currencyToBottom = document.getElementById("currencyToBottom");
        var currencyTypeBottom = document.getElementById("currencyTypeBottom");

        // Empty all
        currencyType.options.length = 0;
        currencyFrom.options.length = 0;
        currencyTo.options.length = 0;
        currencyFromBottom.options.length = 0;
        currencyToBottom.options.length = 0;
        currencyTypeBottom.options.length = 0;

        var bank = document.getElementById("bank").value;
        if(bank == "TCMB"){
            for(var i = 0;i < 19;i++){
                currencyFrom.options[currencyFrom.options.length] = new Option(currencies[i] + " - " + currencyNames[i] , currencies[i], false, false);
                currencyTo.options[currencyTo.options.length] = new Option(currencies[i] + " - " + currencyNames[i] , currencies[i], false, false);
                currencyFromBottom.options[currencyFromBottom.options.length] = new Option(currencies[i] + " - " + currencyNames[i] , currencies[i], false, false);
                currencyToBottom.options[currencyToBottom.options.length] = new Option(currencies[i] + " - " + currencyNames[i] , currencies[i], false, false);
            }     
            currencyFrom.value = "EUR";
            currencyTo.value = "USD";
            currencyFromBottom.value = "EUR";
            currencyToBottom.value = "USD";          
            currencyType.options[currencyType.options.length] = new Option('Forex Buying', 'Forex Buying', false, false);
            currencyType.options[currencyType.options.length] = new Option('Forex Selling', 'Forex Selling', false, false);
            currencyTypeBottom.options[currencyTypeBottom.options.length] = new Option('Forex Buying', 'Forex Buying', false, false);
            currencyTypeBottom.options[currencyTypeBottom.options.length] = new Option('Forex Selling', 'Forex Selling', false, false);
        }
        else if(bank == "ECB"){
            for(var i = 0;i < currencies.length;i++){
                if(i < 15 || i >18){
                    currencyFrom.options[currencyFrom.options.length] = new Option(currencies[i] + " - " + currencyNames[i] , currencies[i], false, false);
                    currencyTo.options[currencyTo.options.length] = new Option(currencies[i] + " - " + currencyNames[i] , currencies[i], false, false);
                    currencyFromBottom.options[currencyFromBottom.options.length] = new Option(currencies[i] + " - " + currencyNames[i] , currencies[i], false, false);
                    currencyToBottom.options[currencyToBottom.options.length] = new Option(currencies[i] + " - " + currencyNames[i] , currencies[i], false, false);
                }  
            }   
            currencyFrom.value = "EUR";
            currencyTo.value = "USD";
            currencyFromBottom.value = "EUR";
            currencyToBottom.value = "USD"; 
            currencyType.options[currencyType.options.length] = new Option('Buying', 'Buying', false, false);
            currencyType.options[currencyType.options.length] = new Option('Selling', 'Selling', false, false);
            currencyTypeBottom.options[currencyTypeBottom.options.length] = new Option('Buying', 'Buying', false, false);
            currencyTypeBottom.options[currencyTypeBottom.options.length] = new Option('Selling', 'Selling', false, false);
        }
    }

    //Set all dates to Today
    function setToday() {
        //set Dates and call getCurrencyData
        var now = new Date();
        now.setHours(HOUR);
        var tstart = Math.round(now.getTime()/1e3);
        var res = getCrossRateTCMBDataSelling(tstart,"EUR","USD",function(result){
            if(result == 0){
                tstart -= SECONDS_IN_A_DAY;
            }
            now = new Date(tstart*1e3);
            var month = (now.getMonth() + 1);               
            var day = now.getDate();
            if (month < 10) 
                month = "0" + month;
            if (day < 10) 
                day = "0" + day;
            var today = now.getFullYear() + '-' + month + '-' + day;
            document.getElementById("startDate").value = today;
            document.getElementById("endDate").value = today;
            document.getElementById("dateCur").value = today;
            document.getElementById("dateSingle").value = today;
            //If it is first load of the page, get today data into top pane
            if(isFirstRun){
                getToday();
                isFirstRun = false;
            }
        });        
    }

    //Get today's data into top pane
    function getToday(){
        var date = new Date(document.getElementById("dateSingle").value);
        date.setHours(HOUR);
        
        getAllDataTCMBSelling(date,function(result){
            var value = document.getElementById("resultLabel").value;
            document.getElementById("resultLabel").value = "";
            var lines = value.split('\n');
            lines.splice(0,1);
            var newtext = lines.join(' ');
            lines = newtext.split('  ');
            newtext = lines.join(' ');
            document.getElementById("resultTop").value = newtext;
        });        
    }

    // Button "Get Cross-Rate Currency Data" onClick action.
    // Calls function that fits bank name.
    function getCrossRate(){
        var date = new Date(document.getElementById("dateSingle").value);
        date.setHours(HOUR);
        
        var currencyFrom = document.getElementById("currencyFromBottom").value;
        var currencyTo = document.getElementById("currencyToBottom").value;
        document.getElementById("resultLabel").value = "";
        var bank = document.getElementById("bank").value;
        if(bank == "ECB"){
            getCrossRateECB(date,date,currencyFrom,currencyTo);
        }
        else if (bank == "TCMB"){
            var type = document.getElementById("currencyType").value;
            if(type == "Forex Selling"){
                getCrossRateTCMBSelling(date,date,currencyFrom,currencyTo);
            }
            else if(type == "Forex Buying"){
                getCrossRateTCMBBuying(date,date,currencyFrom,currencyTo);
            }
        }
    }
    
    // Button "Get Cross-Rate Currency Data Between Dates" onClick action.
    // Calls function that fits bank name.
    function getCrossRateBetweenDates(){
        var startDate = new Date(document.getElementById("startDate").value);
        startDate.setHours(HOUR);
        var endDate = new Date(document.getElementById("endDate").value);
        endDate.setHours(HOUR);

        var currencyFrom = document.getElementById("currencyFromBottom").value;
        var currencyTo = document.getElementById("currencyToBottom").value;
        document.getElementById("resultLabel").value = "";
        var bank = document.getElementById("bank").value;
        if(bank == "ECB"){
            document.getElementById("resultLabel").value = currencyFrom + "/" + currencyTo + " Cross-Rate Values between " + stringFromDate(startDate) + " and " + stringFromDate(endDate) + " from European Central Bank.\n";
            getCrossRateECB(startDate,endDate,currencyFrom,currencyTo);
        }
        else if (bank == "TCMB"){
            var type = document.getElementById("currencyType").value;
            if(type == "Forex Selling"){
                document.getElementById("resultLabel").value = currencyFrom + "/" + currencyTo + " Cross-Rate Values between " + stringFromDate(startDate) + " and " + stringFromDate(endDate) + " from TCMB Forex Selling.\n";
                getCrossRateTCMBSelling(startDate,endDate,currencyFrom,currencyTo);
            }
            else if(type == "Forex Buying"){
                document.getElementById("resultLabel").value = currencyFrom + "/" + currencyTo + " Cross-Rate Values between " + stringFromDate(startDate) + " and " + stringFromDate(endDate) + " from TCMB Forex Buying.\n";
                getCrossRateTCMBBuying(startDate,endDate,currencyFrom,currencyTo);
            }
        }
    }

    // Gets result from another method and prints them into "resultLabel"
    function getCrossRateECB(startDate,endDate,currencyFrom,currencyTo){
        var tstart = Math.round(startDate.getTime()/1e3);
        var tend = Math.round(endDate.getTime()/1e3);
        var count = 0;
        var dates = [];
        while(tstart <= tend){
            dates[dates.length] = stringFromEpochTime(tstart);
            var res = getCrossRateDataECB(tstart,currencyFrom,currencyTo,function(result){
                document.getElementById("resultLabel").value = document.getElementById("resultLabel").value + dates[count] + ":  " + result + "\n";
                count++;
            });
            tstart += SECONDS_IN_A_DAY;
        }
          
    }

    // Connects to Smart Contract via Web3.js and gets value
    function getCrossRateDataECB(date,currencyFrom,currencyTo,_callback){
        var contract = web3js.eth.contract(abi,function(error, result){
            if(!error) {
                //
            }else {
                console.error(error);
            }
        }).at(contractaddress);

        var currencyFromHex = convertToHex( currencyFrom);
        var currencyToHex = convertToHex( currencyTo);
        exchangeRate = contract.convert_x_to_y_ecb(parseInt(date), currencyFromHex, currencyToHex, function(error_2, result_2){
        if(!error_2) {
            var exchangeRate = parseInt(result_2)/1e9;
            _callback(exchangeRate);
        }else {
            console.error(error_2);
        }
        });
    }

    // Gets result from another method and prints them into "resultLabel"
    function getCrossRateTCMBSelling(startDate,endDate,currencyFrom,currencyTo){
        var tstart = Math.round(startDate.getTime()/1e3);
        var tend = Math.round(endDate.getTime()/1e3);
        var count = 0;
        var dates = [];
        while(tstart <= tend){
            dates[dates.length] = stringFromEpochTime(tstart);
            var res = getCrossRateTCMBDataSelling(tstart,currencyFrom,currencyTo,function(result){
                document.getElementById("resultLabel").value = document.getElementById("resultLabel").value + dates[count] + ":  " + result + "\n";
                count++;
            });
            tstart += SECONDS_IN_A_DAY;
        }
    }

    // Connects to Smart Contract via Web3.js and gets value
    function getCrossRateTCMBDataSelling(date,currencyFrom,currencyTo,_callback){
        var contract = web3js.eth.contract(abi,function(error, result){
            if(!error) {
                //
            }else {
                console.error(error);
            }
        }).at(contractaddress);

        var currencyFromHex = convertToHex( currencyFrom);
        var currencyToHex = convertToHex( currencyTo);
        exchangeRate = contract.convert_x_to_y_tcmb_forexselling(parseInt(date), currencyFromHex, currencyToHex, function(error_2, result_2){
        if(!error_2) {
            var exchangeRate = parseInt(result_2)/1e9;
            _callback(exchangeRate);
        }else {
            console.error(error_2);
        }
        });
    }

    // Gets result from another method and prints them into "resultLabel"
    function getCrossRateTCMBBuying(startDate,endDate,currencyFrom,currencyTo){
        var tstart = Math.round(startDate.getTime()/1e3);
        var tend = Math.round(endDate.getTime()/1e3);
        var count = 0;
        var dates = [];
        while(tstart <= tend){
            dates[dates.length] = stringFromEpochTime(tstart);
            var res = getCrossRateTCMBDataBuying(tstart,currencyFrom,currencyTo,function(result){
                document.getElementById("resultLabel").value = document.getElementById("resultLabel").value + dates[count] + ":  " + parseInt(result) + "\n";
                count++;
            });
            tstart += SECONDS_IN_A_DAY;
        }
    }

    // Connects to Smart Contract via Web3.js and gets value
    function getCrossRateTCMBDataBuying(date,currencyFrom,currencyTo){
        var contract = web3js.eth.contract(abi,function(error, result){
            if(!error) {
                //
            }else {
                console.error(error);
            }
        }).at(contractaddress);

        var currencyFromHex = convertToHex( currencyFrom);
        var currencyToHex = convertToHex(currencyTo);
        exchangeRate = contract.convert_x_to_y_tcmb_forexbuying(parseInt(date), currencyFromHex, currencyToHex, function(error_2, result_2){
        if(!error_2) {
            var exchangeRate = parseInt(result_2)/1e9;
            return exchangeRate;            
        }else {
            console.error(error_2);
        }
        });
    }

    var values = [];
    var names = [];
    var completed;
    // onClick action of Button "Get All Data"
    function getAllData(){
        var bank = document.getElementById("bank").value;
        var date = new Date(document.getElementById("dateSingle").value);
        date.setHours(HOUR);
        document.getElementById("resultLabel").value = "";
        if(bank == "ECB"){
            getAllDataECB(date);
        }
        else if (bank == "TCMB"){
            var type = document.getElementById("currencyType").value;
            if(type == "Forex Selling"){
                getAllDataTCMBSelling(date,function(){});
            }
            else if(type == "Forex Buying"){
                getAllDataTCMBBuying(date);
            }
        }
    }

    // Gets parameters from fields and connects to Smart Contract using Web3.js
    // Print the data returned from Smart Contract into "resultLabel"
    function getAllDataECB(date){
        completed = 0;
        values.length = 0;
        names.length = 0;
            
        for(var i = 0;i < currencies.length;i++){
            if(i < 15 || i >18){
                getECB(i,date);                
            }
        }
    }
    
    function getECB(i,date){
        var currencyHex = convertToHex(currencies[i]);
        var tstart = Math.round(date.getTime()/1e3);

        var contract = web3js.eth.contract(abi,function(error, result){
            if(!error) {
                console.log("Contract creation succeeed.");
            }else {
                console.error(error);
            }
        }).at(contractaddress);
        var wd = contract.get_ecb(parseInt(tstart), currencyHex, function(error_2, result_2){
            if(!error_2) {
                completed++;
                console.log(completed);
                var exchangeRate = parseInt(result_2)/1e9;
                values[i - (i>16 ? 4:0)] = exchangeRate;
                names[i - (i>16 ? 4:0)] = currencies[i];
                if(completed == 33){
                    document.getElementById("resultLabel").value = document.getElementById("resultLabel").value + stringFromDate(date) + " Currency Data from European Central Bank as compared to 1 EUR \n";
                    var j;
                    for(j = 0;j<values.length;j++){
                        document.getElementById("resultLabel").value =  document.getElementById("resultLabel").value + names[j] + ":  " + values[j] + "\n";
                    }
                }
            }else { console.error(error_2);
        }});
    }

    // Gets parameters from fields and connects to Smart Contract using Web3.js
    // Print the data returned from Smart Contract into "resultLabel"
    function getAllDataTCMBSelling(date,_callback){
        values.length = 0;
        names.length = 0;
        completed = 0;
        for(var i = 0;i < 19;i++){
            getTCMBSelling(i,date,_callback);
        }
    }

    function getTCMBSelling(i,date,_callback){
        var currencyHex = convertToHex(currencies[i]);
        var tstart = Math.round(date.getTime()/1e3);

        var contract = web3js.eth.contract(abi,function(error, result){
            if(!error) {
                console.log("Contract creation succeeed.");
            }else {
                console.error(error);
            }
        }).at(contractaddress);
        var wd = contract.get_tcmb_forexselling(parseInt(tstart), currencyHex, function(error_2, result_2){
            if(!error_2) {
                completed++;
                var exchangeRate = parseInt(result_2)/1e9;
                values[i] = exchangeRate;
                names[i] = currencies[i];
                if(completed == 19){
                    document.getElementById("resultLabel").value = document.getElementById("resultLabel").value + stringFromDate(date) + " Currency Data from TCMB Forex Selling as compared to 1 ABC = X TRY \n";
                    for(var j = 0;j<values.length;j++){
                        document.getElementById("resultLabel").value =  document.getElementById("resultLabel").value + names[j] + ":  " + values[j] + "\n";
                    }
                    _callback(exchangeRate);
                }
            }else { console.error(error_2);
        }});
    }

    // Gets parameters from fields and connects to Smart Contract using Web3.js
    // Print the data returned from Smart Contract into "resultLabel"
    function getAllDataTCMBBuying(date){
        values.length = 0;
        names.length = 0;
        completed = 0;        
        for(var i = 0;i < 19;i++){
            getTCMBBuying(i,date);
        }
    }

    function getTCMBBuying(i,date){
        var currencyHex = convertToHex(currencies[i]);
        var tstart = Math.round(date.getTime()/1e3);

        var contract = web3js.eth.contract(abi,function(error, result){
            if(!error) {
                console.log("Contract creation succeeed.");
            }else {
                console.error(error);
            }
        }).at(contractaddress);
        var wd = contract.get_tcmb_forexbuying(parseInt(tstart), currencyHex, function(error_2, result_2){
            if(!error_2) {
                completed++;
                var exchangeRate = parseInt(result_2)/1e9;
                values[i] = exchangeRate;
                names[i] = currencies[i];
                if(completed == 19){
                    document.getElementById("resultLabel").value = document.getElementById("resultLabel").value + stringFromDate(date) + " Currency Data from TCMB Forex Buying as compared to 1 ABC = X TRY \n";
                    for(var j = 0;j<values.length;j++){
                        document.getElementById("resultLabel").value =  document.getElementById("resultLabel").value + names[j] + ":  " + values[j] + "\n";
                    }
                }
            }else { console.error(error_2);
        }});
    }
    // onClick action of Button "Get All Data Between Dates"
    function getAllDataBetweenDates(){
        var bank = document.getElementById("bank").value;
        var startDate = new Date(document.getElementById("startDate").value);
        startDate.setHours(HOUR);
        var endDate = new Date(document.getElementById("endDate").value);
        endDate.setHours(HOUR);
        document.getElementById("resultLabel").value = "";
        if(bank == "ECB"){
            getAllECB(startDate,endDate);
        }
        else if (bank == "TCMB"){
            var type = document.getElementById("currencyType").value;
            if(type == "Forex Selling"){
                getAllTCMBSelling(startDate,endDate);
            }
            else if(type == "Forex Buying"){
                getAllTCMBBuying(startDate,endDate);
            }
        }
    }

    // Calls Get All Data function in a for loop between dates.
    function getAllECB(startDate,endDate){
        var tstart = Math.round(startDate.getTime()/1e3);
        var tend = Math.round(endDate.getTime()/1e3);
        var count = 1;
        while(tstart <= tend){
            date = new Date(tstart*1e3);
            date.setHours(HOUR);
            getAllDataECB(date);
            tstart += SECONDS_IN_A_DAY;
        }
    }

    // Calls Get All Data function in a for loop between dates.
    function getAllTCMBSelling(){
        var tstart = Math.round(startDate.getTime()/1e3);
        var tend = Math.round(endDate.getTime()/1e3);
        var count = 1;
        while(tstart <= tend){
            date = new Date(tstart*1e3);
            date.setHours(HOUR);
            getAllDataTCMBSelling(date,function(){});
            tstart += SECONDS_IN_A_DAY;
        }
    }

    // Calls Get All Data function in a for loop between dates.
    function getAllTCMBBuying(){
        var tstart = Math.round(startDate.getTime()/1e3);
        var tend = Math.round(endDate.getTime()/1e3);
        var count = 1;
        while(tstart <= tend){
            date = new Date(tstart*1e3);
            date.setHours(HOUR);
            getAllDataTCMBBuying(date);
            tstart += SECONDS_IN_A_DAY;
        }
    }   

    // onClick action of button Convert
    function convert(){
        var bank = document.getElementById("bank").value;
        if(bank == "ECB"){
            convertECB();
        }
        else if (bank == "TCMB"){
            var type = document.getElementById("currencyType").value;
            if(type == "Forex Selling"){
                convertTCMBSelling();
            }
            else if(type == "Forex Buying"){
                convertTCMBBuying();
            }
        }
    }

    // Connect to Smart Contract via Web3.js and multiplies "amount" with gathered rate
    function convertECB(){
        var date = new Date(document.getElementById("dateCur").value);
        date.setHours(HOUR);
        var tstart = Math.round(date.getTime()/1e3);
        
        var currencyFrom = document.getElementById("currencyFrom").value;
        var currencyTo = document.getElementById("currencyTo").value;

        var amount = document.getElementById("amount").value;

        var res = getCrossRateDataECB(tstart,currencyFrom,currencyTo,function(result){
            var exchanged = amount*result;
            document.getElementById("result").value = exchanged;        
         });
    }

    // Connect to Smart Contract via Web3.js and multiplies "amount" with gathered rate
    function convertTCMBSelling(){
        var date = new Date(document.getElementById("dateCur").value);
        date.setHours(HOUR);
        var tstart = Math.round(date.getTime()/1e3);
        
        var currencyFrom = document.getElementById("currencyFrom").value;
        var currencyTo = document.getElementById("currencyTo").value;

        var amount = document.getElementById("amount").value;

        var exchangeRate = getCrossRateTCMBDataSelling(tstart,currencyFrom,currencyTo,function(result){
            var exchanged = amount*result;
            document.getElementById("result").value = exchanged;        
         });
    }

    // Connect to Smart Contract via Web3.js and multiplies "amount" with gathered rate
    function convertTCMBBuying(){
        var date = new Date(document.getElementById("dateCur").value);
        date.setHours(HOUR);
        var tstart = Math.round(date.getTime()/1e3);
        
        var currencyFrom = document.getElementById("currencyFrom").value;
        var currencyTo = document.getElementById("currencyTo").value;

        var amount = document.getElementById("amount").value;

        var exchangeRate = getCrossRateTCMBDataBuying(tstart,currencyFrom,currencyTo,function(result){
            var exchanged = amount*result;
            document.getElementById("result").value = exchanged;        
         });
    }