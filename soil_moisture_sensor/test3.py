from gpiozero import MCP3008
from time import sleep
import sys

#create an object that refers to MCP3008 channel 0
pot = MCP3008(0)

#The capacitance is read via the soil moisture sensor. 
#Range of values is used to convert to 100 point scale 
#i.e.                 In air = 0     In water = 100


#while True:
#    reading = pot.value
#    print(reading)
#    sleep(0.1)
reading = pot.value

print(reading)