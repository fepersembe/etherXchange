from web3 import Web3, HTTPProvider
from tcmb.tcmb_parser import TCMB_Processor
from ecb.ecb_parser import ECB_Processor
from data_export import ecb_upload
from web3.contract import ConciseContract
import json
import time

old_ecb_currencies = ['USD', 'JPY', 'BGN', 'CYP', 'CZK', 'DKK', 'EEK', 
		'GBP', 'HUF', 'LTL', 'LVL', 'MTL', 'PLN', 'ROL', 'RON', 'SEK', 'SIT', 
		'SKK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRL', 'TRY', 'AUD', 'BRL', 
		'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 
		'PHP', 'SGD', 'THB', 'ZAR', 'EUR']
#return epoch date

def epoch_day(epoch_time):
	epoch_time = int(epoch_time)
	return(epoch_time - (epoch_time % 86400))

# configuration
#===============================================

with open('config_meta.json') as json_data_file:
	config_data = json.load(json_data_file)

owner_address = config_data["owner"]["address"]
owner_private_key = config_data["owner"]["private_key"]
contract_address = config_data["contract"]["address"]
contract_abi = config_data["contract"]["abi"]
gas = int(config_data["price"]["gas"])
gas_price = Web3.toWei( int(config_data["price"]["gas_price"]), 'gwei')
ecb_old_data_log_path = config_data["log"]["ecb_old_data"]




contract_address =  Web3.toChecksumAddress(contract_address)

#===============================================

#--------------------------------------------------------------------------------
# ropsten provider

infura_provider = HTTPProvider('https://ropsten.infura.io')
web3 = Web3([infura_provider])

# contract instance

contract_instance = web3.eth.contract(abi=contract_abi, address=contract_address)

#--------------------------------------------------------------------------------


#+++++++++++++++++++++++++++++++++++++++++++++++

unix_time = epoch_day(time.time())

#+++++++++++++++++++++++++++++++++++++++++++++++


def old_data_99():
	OLD_DATA = ecb_upload.to_big_dict()
	unix_time = epoch_day(time.time())
	nonce = web3.eth.getTransactionCount(owner_address)
	f = open(old_data_log, "a")
	for daily_dict in OLD_DATA:
		unix_time = daily_dict['Date']
		for curr in old_ecb_currencies:
			if daily_dict[curr] != 0:
				curr_code = bytes(curr, encoding='utf-8')
				curr_value = web3.toInt(int( daily_dict[curr] * (10**9) ))
				transfer = contract_instance.functions.add_ecb(unix_time, curr_code, curr_value).buildTransaction({'gasPrice': gas_price, 'gas': gas, 'nonce': nonce})
				signed = web3.eth.account.signTransaction(transfer, owner_private_key)
				tx_hash = web3.eth.sendRawTransaction(signed.rawTransaction)
				tx_hash = tx_hash.hex()
				print(time.strftime("%Y-%m-%d %H:%M"), unix_time, tx_hash, curr_code, file=f)
				nonce +=1
	f.close()


if __name__ == "__main__":
	old_data_99()
