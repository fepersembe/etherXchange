from web3 import Web3, HTTPProvider, IPCProvider
from tcmb.tcmb_parser import TCMB_Processor
from ecb.ecb_parser import ECB_Processor
from web3.contract import ConciseContract
from web3.middleware import geth_poa_middleware
import json
import time
from datetime import timedelta, date

tcmb_currencies = ["TRY", "USD", "AUD", "DKK", "EUR", "GBP", "CHF", "SEK", "CAD", 
		"KWD", "NOK", "SAR", "JPY", "BGN", "RON", "RUB", "IRR", "CNY", "PKR"]


ecb_currencies = ["EUR", "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", 
		"RON", "SEK", "CHF", "ISK", "NOK", "HRK", "RUB", "TRY", "AUD", "BRL", 
		"CAD", "CNY", "HKD", "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", 
		"PHP", "SGD", "THB", "ZAR"]

def epoch_day(epoch_time):
	epoch_time = int(epoch_time)
	return(epoch_time - (epoch_time % 86400))

def daterange(start_date, end_date):
    for n in range(int ((end_date - start_date).days)):
        yield start_date + timedelta(n)

with open('config_ebloc.json') as json_data_file:
	config_data = json.load(json_data_file)

owner_address = config_data["owner"]["address"]
owner_password = config_data["owner"]["password"]
contract_address = config_data["contract"]["address"]
contract_abi = config_data["contract"]["abi"]
gas = int(config_data["price"]["gas"])
gas_price = Web3.toWei( int(config_data["price"]["gas_price"]), 'gwei')
tcmb_old_log_path = config_data["log"]["tcmb_old_data"]
geth_ipc_path = config_data["geth"]["geth_ipc_path"]
BASE_URL = config_data["url"]["base_url"]

contract_address =  Web3.toChecksumAddress(contract_address)

web3 = Web3(IPCProvider(geth_ipc_path))
web3.middleware_stack.inject(geth_poa_middleware, layer=0)

web3.eth.defaultAccount = web3.eth.accounts[0]
web3.personal.unlockAccount(web3.eth.accounts[0], owner_password, 60000000)

contract_instance = web3.eth.contract(abi=contract_abi, address=contract_address, ContractFactoryClass=ConciseContract)

unix_time = Web3.toInt(epoch_day(time.time()))

def add_old_tcmb():
	start_date = date(2018, 1, 1)
	end_date = date(2018, 6, 1)
	TCMB = TCMB_Processor()
	f = open(tcmb_old_log_path, "a")
	for single_date in daterange(start_date, end_date):
		url = BASE_URL + str(single_date.year) + str(single_date.month).zfill(2) + "/" + str(single_date.day).zfill(2) + str(single_date.month).zfill(2) + str(single_date.year) + ".xml"
		TCMB = TCMB_Processor(url)
		unix_time = Web3.toInt(int(time.mktime(single_date.timetuple())))
		if(bool(TCMB.CURRENCY_DICT)):
			for curr in tcmb_currencies:
				curr_code = bytes(curr, encoding='utf-8')
				curr_value_fb = web3.toInt(int(float(TCMB.CURRENCY_DICT[curr]["ForexBuying"])*(10**9)))
				curr_value_fs = web3.toInt(int(float(TCMB.CURRENCY_DICT[curr]["ForexSelling"])*(10**9)))
				# forex buying
				tx_hash_fb = contract_instance.add_tcmb_forexbuying(unix_time, curr_code, curr_value_fb, transact={'from': web3.eth.accounts[0]})
				tx_hash_fb = tx_hash_fb.hex()
				print(time.strftime("%Y-%m-%d %H:%M"), unix_time, tx_hash_fb, curr_code, file=f)
				# forex selling
				tx_hash_fs = contract_instance.add_tcmb_forexselling(unix_time, curr_code, curr_value_fs, transact={'from': web3.eth.accounts[0]})
				tx_hash_fs = tx_hash_fs.hex()
				print(time.strftime("%Y-%m-%d %H:%M"), unix_time, tx_hash_fs, curr_code, file=f)
		else:
			print(time.strftime("%Y-%m-%d %H:%M"), unix_time, "Weekend", file=f)
	f.close()


if __name__ == "__main__":
	add_old_tcmb()
	print(time.strftime("%Y-%m-%d %H:%M"), " DONE")