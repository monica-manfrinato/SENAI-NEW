from machine import ADC
from utime import sleep

ldr = ADC(26)

while True:
    leitura_luz = ldr.read_u16()
    print(leitura_luz)
    sleep(1)