#exercicio 03) Adicione o Potenciômetro ao circuito (conectado a um pino ADC da Pico).
# Escreva um programa que leia o valor analógico do potenciômetro e o
# repasse diretamente para o duty cycle do LED via PWM. Resultado
# esperado: Ao girar o potenciômetro, o brilho do LED aumenta ou diminui
# proporcionalmente.

from machine import Pin, PWM, ADC
from utime import sleep

led = PWM(Pin(16))
led.freq(1000)
pot = ADC(28)

while True:
    leitura_pot = pot.read_u16()
    led.duty_u16(leitura_pot)
    sleep(0.5)