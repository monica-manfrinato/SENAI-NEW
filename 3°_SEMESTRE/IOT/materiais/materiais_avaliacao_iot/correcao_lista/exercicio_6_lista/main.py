#exercicio 06)Monte um circuito com 1 LED simples e 1 Potenciômetro (conectado a um
# pino ADC). Crie um código onde o LED pisca continuamente. O valor
# analógico lido pelo potenciômetro deve ser convertido para definir o
# tempo de pausa (sleep()) entre o ligar e desligar do LED. Resultado
# esperado: Ao girar o eixo do potenciômetro, o LED pisca mais rápido ou
# mais devagar.

from machine import Pin, ADC
from utime import sleep

potenciometro = ADC(28)
led = Pin(16, Pin.OUT)

while True:
    
    valor_potenciometro = potenciometro.read_u16()
    print(valor_potenciometro)

    led.toggle()
    sleep(65535 / valor_potenciometro * 0.02)
    sleep(0.02)


#VERSÃO PROFESSOR:

# from machine import Pin, ADC
# from utime import sleep
# led = Pin(16, Pin.OUT)
# pot = ADC(28)
# while True:
# # Transforma 0-65535 em 0.05s a 1.05s
#     tempo_pausa = (pot.read_u16() / 65535.0) + 0.05
#     led.toggle()
#     sleep(tempo_pausa)