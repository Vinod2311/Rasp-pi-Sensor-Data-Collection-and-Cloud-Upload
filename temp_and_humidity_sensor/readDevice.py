
import adafruit_dht
import board



def readTempandHumidity():
  dht_device = adafruit_dht.DHT22(board.D17, use_pulseio=False)
  result = None
  while result == None:
    try:
      temperature = round(dht_device.temperature,2)
      humidity = round(dht_device.humidity,2)
      result = temperature,humidity
    except RuntimeError as err:
      error = err.args[0]
      print(error)
      pass
      
  dht_device.exit()
  return result


#readTempandHumidity()


