from web3 import Web3, HTTPProvider
from tcmb.tcmb_parser import TCMB_Processor
from ecb.ecb_parser import ECB_Processor
from web3.contract import ConciseContract
import json
import time

tcmb_currencies = ["TRY", "USD", "AUD", "DKK", "EUR", "GBP", "CHF", "SEK", "CAD", 
		"KWD", "NOK", "SAR", "JPY", "BGN", "RON", "RUB", "IRR", "CNY", "PKR"]

ecb_currencies = ["EUR", "USD", "JPY", "BGN", "CZK", "DKK", "GBP", "HUF", "PLN", 
		"RON", "SEK", "CHF", "ISK", "NOK", "HRK", "RUB", "TRY", "AUD", "BRL", 
		"CAD", "CNY", "HKD", "IDR", "ILS", "INR", "KRW", "MXN", "MYR", "NZD", 
		"PHP", "SGD", "THB", "ZAR"]


#return epoch date
DAY = 86400

def epoch_day(epoch_time):
	epoch_time = int(epoch_time)
	return(epoch_time - (epoch_time % DAY))

# configuration
#===============================================

with open('config_meta.json') as json_data_file:
	config_data = json.load(json_data_file)

owner_address = config_data["owner"]["address"]
owner_private_key = config_data["owner"]["private_key"]
contract_address = config_data["contract"]["address"]
contract_abi = config_data["contract"]["abi"]
gas = int(config_data["price"]["gas"])
gas_price = web3.toWei( int(config_data["price"]["gas_price"]), 'gwei')
ecb_daily_log_path = config_data["log"]["ecb_daily"]
tcmb_daily_log_path = config_data["log"]["tcmb_daily"]



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



def add_ecb():
	unix_time = epoch_day(time.time())
	ECB = ECB_Processor()
	f = open(ecb_daily_log_path, "a")
	if(time.strftime("%Y-%m-%d") == ECB.Currency_Dict["time"]):
		nonce = web3.eth.getTransactionCount(owner_address)
		for curr in ecb_currencies:
			curr_code = bytes(curr, encoding='utf-8')
			curr_value = web3.toInt(int(float(ECB.Currency_Dict[curr])*(10**9)))
			transfer = contract_instance.functions.add_ecb(unix_time, curr_code, curr_value).buildTransaction({'gasPrice': gas_price, 'gas': gas, 'nonce': nonce})
			signed = web3.eth.account.signTransaction(transfer, owner_private_key)
			tx_hash = web3.eth.sendRawTransaction(signed.rawTransaction)
			tx_hash = tx_hash.hex()
			print(time.strftime("%Y-%m-%d %H:%M"), unix_time, tx_hash, curr_code, file=f)
			nonce +=1
	else:
		print(time.strftime("%Y-%m-%d %H:%M"), unix_time, "Weekend", file=f)
	f.close()



def add_tcmb():
	unix_time = epoch_day(time.time())
	TCMB = TCMB_Processor()
	nonce = web3.eth.getTransactionCount(owner_address)
	f = open(tcmb_daily_log_path, "a")
	if(time.strftime("%m/%d/%Y") == TCMB.CURRENCY_DICT["Date"]):
		for curr in tcmb_currencies:
			curr_code = bytes(curr, encoding='utf-8')
			curr_value_fb = web3.toInt(int(float(TCMB.CURRENCY_DICT[curr]["ForexBuying"])*(10**9)))
			curr_value_fs = web3.toInt(int(float(TCMB.CURRENCY_DICT[curr]["ForexSelling"])*(10**9)))
			# forex buying
			transfer_fb = contract_instance.functions.add_tcmb_forexbuying(unix_time, curr_code, curr_value_fb).buildTransaction({'gasPrice': gas_price, 'gas': gas, 'nonce': nonce})
			signed_fb = web3.eth.account.signTransaction(transfer_fb, owner_private_key)
			tx_hash_fb = web3.eth.sendRawTransaction(signed_fb.rawTransaction)
			tx_hash_fb = tx_hash_fb.hex()
			print(time.strftime("%Y-%m-%d %H:%M"), unix_time, tx_hash_fb, curr_code, file=f)
			nonce +=1
			# forex selling
			transfer_fs = contract_instance.functions.add_tcmb_forexselling(unix_time, curr_code, curr_value_fs).buildTransaction({'gasPrice': gas_price, 'gas': gas, 'nonce': nonce})
			signed_fs = web3.eth.account.signTransaction(transfer_fs, owner_private_key)
			tx_hash_fs = web3.eth.sendRawTransaction(signed_fs.rawTransaction)
			tx_hash_fs = tx_hash_fs.hex()
			print(time.strftime("%Y-%m-%d %H:%M"), unix_time, tx_hash_fs, curr_code, file=f)
			nonce +=1
	else:
		print(time.strftime("%Y-%m-%d %H:%M"), unix_time, "Weekend", file=f)
	f.close()



if __name__ == "__main__":
	add_ecb()
	add_tcmb()
