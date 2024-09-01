import sys
import os
sys.path.insert(0, os.path.abspath('./'))
from soil_moisture_sensor.readDevice import readSoilMoisture
from light_sensor.readDevice import readLightIntensity
from temp_and_humidity_sensor.readDevice import readTempandHumidity
from temp_and_pressure_sensor.readDevice import readTempAndPressure


import json

def writeReadingData(file):
  reading = dict()
  with open('user.json') as json_file:
    userData = json.load(json_file)
    
    if userData["sensors"]["SEN0183-soilMoisture"] == True :
      soilMoisture = readSoilMoisture()
      reading.update({"soilMoisture(RH)": soilMoisture})
      
    if userData["sensors"]["BH170-lightSensor"] == True :
      lightIntensity = readLightIntensity()
      reading.update({"lightIntensity(lux)": lightIntensity})

    #if userData["sensors"]["DHT22-tempAndHumidity"] == True :
      #tempAndHumidity = readTempandHumidity()
      #temperature = tempAndHumidity[0]
      #reading.update({"temperature DHT22(*C)": temperature})
      #humidity = tempAndHumidity[1]
      #reading.update({"humidity(RH)": humidity})

    if userData["sensors"]["BMP280-tempAndPressure"] == True :
      tempAndPressure = readTempAndPressure()
      temperature2 = tempAndPressure[0]
      reading.update({"temperature BMP280(*C)":temperature2})
      pressure = tempAndPressure[1]
      reading.update({"Pressure(hPa)":pressure})

  with open(file, "w") as outfile: 
    json.dump(reading, outfile)
  



