from web3 import Web3, HTTPProvider, IPCProvider
from tcmb.tcmb_parser import TCMB_Processor
from ecb.ecb_parser import ECB_Processor
from web3.contract import ConciseContract
from data_export import ecb_upload
from web3.middleware import geth_poa_middleware
import json
import time

old_ecb_currencies = ['USD', 'JPY', 'BGN', 'CYP', 'CZK', 'DKK', 'EEK', 
		'GBP', 'HUF', 'LTL', 'LVL', 'MTL', 'PLN', 'ROL', 'RON', 'SEK', 'SIT', 
		'SKK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRL', 'TRY', 'AUD', 'BRL', 
		'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 
		'PHP', 'SGD', 'THB', 'ZAR', 'EUR']

def epoch_day(epoch_time):
	epoch_time = int(epoch_time)
	return(epoch_time - (epoch_time % 86400))

with open('config_ebloc.json') as json_data_file:
	config_data = json.load(json_data_file)

owner_address = config_data["owner"]["address"]
owner_password = config_data["owner"]["password"]
contract_address = config_data["contract"]["address"]
contract_abi = config_data["contract"]["abi"]
gas = int(config_data["price"]["gas"])
gas_price = Web3.toWei( int(config_data["price"]["gas_price"]), 'gwei')
ecb_old_log_path = config_data["log"]["ecb_old_data"]
geth_ipc_path = config_data["geth"]["geth_ipc_path"]

contract_address =  Web3.toChecksumAddress(contract_address)

web3 = Web3(IPCProvider(geth_ipc_path))
web3.middleware_stack.inject(geth_poa_middleware, layer=0)

web3.eth.defaultAccount = web3.eth.accounts[0]
web3.personal.unlockAccount(web3.eth.accounts[0], owner_password, 60000000)

contract_instance = web3.eth.contract(abi=contract_abi, address=contract_address, ContractFactoryClass=ConciseContract)

unix_time = Web3.toInt(epoch_day(time.time()))

def old_data_99():
	OLD_DATA = ecb_upload.to_big_dict()
	unix_time = Web3.toInt(epoch_day(time.time()))
	f = open(ecb_old_log_path, "a")
	for daily_dict in OLD_DATA:
		unix_time = daily_dict['Date']
		for curr in old_ecb_currencies:
			if daily_dict[curr] != 0:
				curr_code = bytes(curr, encoding='utf-8')
				curr_value = web3.toInt(int( daily_dict[curr] * (10**9) ))
				tx_hash = contract_instance.add_ecb(unix_time, curr_code, curr_value, transact={'from': web3.eth.accounts[0]})
				tx_hash = tx_hash.hex()
				print(time.strftime("%Y-%m-%d %H:%M"), unix_time, tx_hash, curr_code, file=f)
	f.close()


if __name__ == "__main__":
	old_data_99()
	print(time.strftime("%Y-%m-%d %H:%M"), " DONE")