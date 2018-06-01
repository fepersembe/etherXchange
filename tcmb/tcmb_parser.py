from urllib.request import urlopen
import xml.etree.ElementTree as ET
import json

TCMB_URL = 'http://www.tcmb.gov.tr/kurlar/today.xml'

class Currency():
	def __init__(self,CrossOrder=-9999, Kod=None, 
				CurrencyCode=None,  Unit=None, 
				Isim=None, CurrencyName=None, 
				ForexBuying=None, ForexSelling=None, 
				BanknoteBuying=None, BanknoteSelling=None,
				CrossRateUSD=None, CrossRateOther=None):
		self.CrossOrder = int(CrossOrder) if CrossOrder else None
		self.Kod = Kod
		self.CurrencyCode = CurrencyCode
		self.Unit = int(Unit)
		self.Isim = Isim
		self.CurrencyName = CurrencyName
		self.ForexBuying = float(ForexBuying) if ForexBuying else None
		self.ForexSelling = float(ForexSelling) if ForexSelling else None
		self.BanknoteBuying = float(BanknoteBuying) if BanknoteBuying else None
		self.BanknoteSelling = float(BanknoteSelling) if BanknoteSelling else None
		self.CrossRateUSD = CrossRateUSD
		self.CrossRateOther = CrossRateOther
	def __str__(self):
		return str(self.__dict__)


class TCMB_Processor():
	def __init__(self, TCMB_URL=TCMB_URL):
		self.CURRENCY_DICT = {}
		self.root_dict = {}
		self.tcmb_currency_xml = TCMB_URL
		try:
			self.url = urlopen(self.tcmb_currency_xml)
			self.tree = ET.parse(self.url)
			self.root_element = self.tree.getroot()
			self.CURRENCY_DICT.update(self.root_element.attrib)
			for child in self.root_element:
				dict_elem_temp = {}
				dict_elem_temp.update(child.attrib)
				for elem in child:
					dict_elem_temp[elem.tag]= elem.text
				self.root_dict[ dict_elem_temp["CurrencyCode"] ] = dict_elem_temp
			for key in self.root_dict:
				self.CURRENCY_DICT[key] = self.root_dict[key]
			self.CURRENCY_DICT["TRY"] = {'CrossOrder': '0', 'Kod': 'TRY', 'CurrencyCode': 'TRY', 'Unit': '1', 'Isim': 'TRY', 'CurrencyName': 'TRY', 'ForexBuying': '1', 'ForexSelling': '1', 'BanknoteBuying': '1', 'BanknoteSelling': '1', 'CrossRateUSD': None, 'CrossRateOther': None}
		except:
			pass
	def  write_as_a_json(self, file_name="tcmb.json"):
		with open(file_name, 'w') as fp:
			json.dump(self.root_dict, fp)


if __name__ == "__main__":
	currencies = TCMB_Processor()
	currencies.write_as_a_json()
	print(currencies.CURRENCY_DICT["TRY"]["ForexSelling"])
	#print(currencies.CURRENCY_DICT["EUR"])
	#print(currencies.CURRENCY_DICT["Date"])
	#print(currencies.CURRENCY_DICT["Tarih"])