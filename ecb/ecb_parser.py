from urllib.request import urlopen
import xml.etree.ElementTree as ET
import json

ECB_URL = 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml'

class ECB_Processor():
	def __init__(self):
		self.Currency_Dict = {}
		self.url = urlopen(ECB_URL)
		self.tree = ET.parse(self.url)
		self.root_element = self.tree.getroot()
		
		#Add time : {'time': '2018-02-12'}
		self.Currency_Dict.update(self.root_element[2][0].attrib)

		for child in self.root_element[2][0]:
			currency = child.attrib["currency"]
			rate = child.attrib["rate"]
			if(currency):
				self.Currency_Dict[ currency ] = float(rate) if rate else None
		self.Currency_Dict["EUR"] = 1.0 

	def __str__(self):
		return "\n".join(["{} : {}".format(key, self.Currency_Dict[key]) for key in self.Currency_Dict])

	def  write_as_a_json(self, file_name="ecb.json"):
		with open(file_name, 'w') as fp:
			json.dump(self.Currency_Dict, fp)

if __name__ == "__main__":
	ecb = ECB_Processor()
	print(ecb)
	#print(ecb.Currency_Dict["time"])
	print(type(ecb.Currency_Dict["EUR"]))
	#print(ecb.Currency_Dict["USD"])
	ecb.write_as_a_json()