#exercicio 04)Substitua o LED simples pelo LED RGB. Configure 3 pinos PWM
# independentes no seu código (um para a cor Vermelha, um para a Verde
# e um para a Azul). Use o Potenciômetro para controlar o brilho apenas da
# cor Vermelha, mantendo o Verde e o Azul sempre desligados (duty cycle
# 0).

from machine import Pin, PWM, ADC
from utime import sleep

red = PWM(Pin(16))
green = PWM(Pin(17))
blue = PWM(Pin(18))

red.freq(1000)
green.freq(1000)
blue.freq(1000)

pot = ADC(28)

blue.duty_u16(0)
green.duty_u16(0)

while True:
    leitura_pot = pot.read_u16()

    red.duty_u16(leitura_pot)
    sleep(0.5)
    