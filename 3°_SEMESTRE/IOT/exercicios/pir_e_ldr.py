
#TESTE PIR

# from machine import Pin
# from utime import sleep
# 
# pir = Pin(17,Pin.IN)
# sleep(10)
# 
# while True:
#     leitura = pir.value()
#     if leitura == 1:
#         print('Presença detectada')
#     else:
#         print('Nada detectado')
#     sleep(0.5)


#TESTE LDR

from machine import Pin, ADC, PWM
from utime import sleep

led_lanterna = Pin(16, Pin.OUT ) #definir a porta, e se o led é entrada ou saída
led_luz = PWM(Pin(18))
led_luz.freq(1000)


ldr = ADC(26)

while True:
    led_lanterna.value(1)
    leitura_luz = ldr.read_u16()
    print(leitura_luz)
    sleep(0.5)
    brilho_invertido = 65535 - leitura_luz
    led_luz.duty_u16(brilho_invertido)