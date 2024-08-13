from gpiozero import MCP3008
from time import sleep
from datetime import datetime
import fs

#create an object that refers to MCP3008 channel 0
pot = MCP3008(0)

#The capacitance is read via the soil moisture sensor. 
#Range of values is used to convert to 100 point scale 
#i.e.                 In air = 0     In water = 100
while True:
    reading = pot.value
    time = datetime.now()
    timeFormatted = time.strftime("%d-%m-%Y, %H:%M:%S")
    print(timeFormatted)
    readingInProportion = 1-((reading-0.376)/0.395)
    soilMoisture = round(readingInProportion*100,2)

    print("Soil Moisture is: ", soilMoisture)
    sleep(2)
