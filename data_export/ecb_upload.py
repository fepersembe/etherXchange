import time
import datetime
import pandas as pd
import math

DAY = 86400

def str_to_epoch(str_date):
	dt = datetime.datetime.strptime(str_date, '%Y-%m-%d')
	return int(time.mktime(dt.timetuple()))


def to_big_dict():
	ex = pd.read_csv("eurofxref-hist.csv")
	CURR_DICT = []
	currencies = ex.dtypes.index.tolist()[1:]
	for index, row in ex.iterrows():
		daily_currs = {}
		for curr_code in currencies:
			if math.isnan(row[curr_code]):
				daily_currs[curr_code] = 0
			else:
				daily_currs[curr_code] = float(row[curr_code])
		daily_currs['EUR'] = float(1)
		daily_currs['Date'] = str_to_epoch(row['Date'])		
		CURR_DICT.append(daily_currs) #if index%100 == 0: print(index)
	return CURR_DICT