
import time
from smbus2 import SMBus
from bmp280 import BMP280


# Initialise the BMP280
bus = SMBus(1)
bmp280 = BMP280(i2c_dev=bus)

def readTempAndPressure():
    temperature = bmp280.get_temperature()
    pressure = bmp280.get_pressure()
    return round(temperature,2),round(pressure,2)
    
