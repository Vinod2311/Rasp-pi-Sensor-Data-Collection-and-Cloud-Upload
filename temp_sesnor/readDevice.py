import time
import adafruit_dht
import board



def readTempandHumidity():
  dht_device = adafruit_dht.DHT22(board.D17)
  result = None
  while result == None:
    try:
      temperature = dht_device.temperature
      humidity = dht_device.humidity
      result = temperature,humidity
    except RuntimeError as err:
      error = err.args[0]
      pass
      #print(err.args[0])
  #print(type(result))
  #print(result)
  dht_device.exit()
  return result

readTempandHumidity()


