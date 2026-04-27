from machine import ADC,Pin
from utime import sleep

ldr = ADC(26)
led = Pin(17, Pin.OUT)

while True:
    leitura_luz = ldr.read_u16()
    if leitura_luz > 0 and leitura_luz <= 3000:
        led.value(0)
    elif leitura_luz > 3000 and leitura_luz >= 65535:
        led.value(1)
    sleep(1)