import sys
import os
sys.path.insert(0, os.path.abspath(''))
from soil_moisture_sensor.readDevice import readSoilMoisture
from light_sensor.readDevice import readLightIntensity
from temp_sesnor.readDevice import readTempandHumidity
import time
from datetime import datetime
import json

def writeReadingData():
  reading = dict()
  soilMoisture = readSoilMoisture()
  reading.update({"soilMoisture": soilMoisture})
  lightIntensity = readLightIntensity()
  reading.update({"lightIntensity": lightIntensity})
  tempAndHumidity = readTempandHumidity()
  temperature = tempAndHumidity[0]
  reading.update({"temperature": temperature})
  humidity = tempAndHumidity[1]
  reading.update({"humidity": humidity})
  with open("../reading.json", "w") as outfile: 
    json.dump(reading, outfile)
  print(reading)

#print(os.path.abspath('../'))
writeReadingData()

