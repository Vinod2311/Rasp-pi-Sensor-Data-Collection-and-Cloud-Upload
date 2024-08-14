import time
import adafruit_dht
import board

dht_device = adafruit_dht.DHT22(board.D17)

def readTempandHumidity():
  result = None
  while result == None:
    try:
      temperature = dht_device.temperature
      humidity = dht_device.humidity
      result = temperature,humidity
    except RuntimeError as err:
      time.sleep(2.0)
      error = err.args[0]
      pass
      #print(err.args[0])
  #print(type(result))
  #print(result)
  dht_device.exit()
  return result

#readTempandHumidity()


