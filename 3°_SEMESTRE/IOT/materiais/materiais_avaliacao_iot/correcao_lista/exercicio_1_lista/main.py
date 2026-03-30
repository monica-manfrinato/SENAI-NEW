#exercício 1) Monte um circuito com 1 Push Button e 1 LED simples. 
# Escreva um código em MicroPython onde o LED acende apenas enquanto o botão 
# estiver pressionado. Dica: Lembre-se de configurar o pino do botão como Pin.IN
# (com Pin.PULL_DOWN ou PULL_UP) e o do LED como Pin.OUT.

from machine import Pin 
from utime import sleep

LED = Pin(16, Pin.OUT)
BUTTON = Pin(17, Pin.IN)

while True:
    if BUTTON.value() == 1:
        print('Botão pressionado!')
        LED.on()
        sleep(1)
    else:
        print('Botão não pressionado')
        LED.off()
        sleep(1)