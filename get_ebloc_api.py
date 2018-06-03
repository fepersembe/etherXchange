from web3 import Web3, HTTPProvider, IPCProvider
from tcmb.tcmb_parser import TCMB_Processor
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

with open('config_ebloc.json') as json_data_file:
	config_data = json.load(json_data_file)

ACCOUNT_ADDRESS = "" #config_data["owner"]["address"]
ACCOUNT_PASSWORD = "" #config_data["owner"]["password"]
contract_address = config_data["contract"]["address"]
contract_abi = config_data["contract"]["abi"]

contract_address =  Web3.toChecksumAddress(contract_address)

web3 = Web3(IPCProvider(geth_ipc_path))
web3.middleware_stack.inject(geth_poa_middleware, layer=0)

contract_instance = web3.eth.contract(abi=contract_abi, address=contract_address, ContractFactoryClass=ConciseContract)


def get_ecb_date(YYYY, MM, DD, currency_code):
	unix_time = Web3.toInt(int(time.mktime(date(YYYY, MM, DD).timetuple())))
	curr_code = bytes(currency_code, encoding='utf-8')
	result = contract_instance.get_ecb(unix_time, curr_code)
	return result

def get_ecb_epoch(epoch_time, currency_code):
	unix_time = Web3.toInt(int(epoch_time))
	curr_code = bytes(currency_code, encoding='utf-8')
	result = contract_instance.get_ecb(unix_time, curr_code)
	return result

def get_tcmb_forexbuying_date(YYYY, MM, DD, currency_code):
	unix_time = Web3.toInt(int(time.mktime(date(YYYY, MM, DD).timetuple())))
	curr_code = bytes(currency_code, encoding='utf-8')
	result = contract_instance.get_tcmb_forexbuying(unix_time, curr_code)
	return result

def get_tcmb_forexbuying_epoch(epoch_time, currency_code):
	unix_time = Web3.toInt(int(epoch_time))
	curr_code = bytes(currency_code, encoding='utf-8')
	result = contract_instance.get_tcmb_forexbuying(unix_time, curr_code)
	return result

def get_tcmb_forexselling_date(YYYY, MM, DD, currency_code):
	unix_time = Web3.toInt(int(time.mktime(date(YYYY, MM, DD).timetuple())))
	curr_code = bytes(currency_code, encoding='utf-8')
	result = contract_instance.get_tcmb_forexselling(unix_time, curr_code)
	return result

def get_tcmb_forexselling_epoch(epoch_time, currency_code):
	unix_time = Web3.toInt(int(epoch_time))
	curr_code = bytes(currency_code, encoding='utf-8')
	result = contract_instance.get_tcmb_forexselling(unix_time, curr_code)
	return result


def get_ecb_today_all():
	unix_time = Web3.toInt(int(time.time()))
	temp_dict = {}
	for currency_code in ecb_currencies:
		curr_code = bytes(currency_code, encoding='utf-8')
		temp_dict[currency_code] = contract_instance.get_ecb(unix_time, curr_code)
	return temp_dict

def get_tcmb_forexbuying_today_all():
	unix_time = Web3.toInt(int(time.time()))
	temp_dict = {}
	for currency_code in tcmb_currencies:
		curr_code = bytes(currency_code, encoding='utf-8')
		temp_dict[currency_code] = contract_instance.get_tcmb_forexbuying(unix_time, curr_code)
	return temp_dict

def get_tcmb_forexselling_today_all():
	unix_time = Web3.toInt(int(time.time()))
	temp_dict = {}
	for currency_code in tcmb_currencies:
		curr_code = bytes(currency_code, encoding='utf-8')
		temp_dict[currency_code] = contract_instance.get_tcmb_forexselling(unix_time, curr_code)
	return temp_dict


if __name__ == "__main__":
	print(get_ecb_today_all())
	print(get_tcmb_forexbuying_today_all())
	print(get_tcmb_forexselling_today_all())




