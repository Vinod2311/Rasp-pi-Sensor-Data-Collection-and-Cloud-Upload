import sys
import os
sys.path.insert(0, os.path.abspath('./'))
#print(os.path.abspath('./'))
#print(sys.path[0])
#print(os.path.realpath(__file__))
#print(os.path.dirname(os.path.realpath(__file__)))

from soil_moisture_sensor.readDevice import readSoilMoisture
from light_sensor.readDevice import readLightIntensity
from temp_and_humidity_sensor.readDevice import readTempandHumidity
from temp_and_pressure_sensor.readDevice import readTempAndPressure
import time
from datetime import datetime
import json

def writeReadingData(file):
  reading = dict()
  soilMoisture = readSoilMoisture()
  reading.update({"soilMoisture(RH)": soilMoisture})

  lightIntensity = readLightIntensity()
  reading.update({"lightIntensity(lux)": lightIntensity})

  #tempAndHumidity = readTempandHumidity()
  #temperature = tempAndHumidity[0]
  #reading.update({"temperature DHT22(*C)": temperature})
  #humidity = tempAndHumidity[1]
  #reading.update({"humidity(RH)": humidity})

  tempAndPressure = readTempAndPressure()
  #print(tempAndPressure)
  temperature2 = tempAndPressure[0]
  reading.update({"temperature BMP280(*C)":temperature2})
  pressure = tempAndPressure[1]
  reading.update({"Pressure(hPa)":pressure})

  with open(file, "w") as outfile: 
    json.dump(reading, outfile)
  #print('Sensor readings: ', reading)
  #print(reading)

#print(os.path.abspath('../'))
#writeReadingData()

