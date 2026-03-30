#exercicio 09)Conecte o LED RGB e 1 Potenciômetro. Configure os pinos da cor Vermelha
# e da cor Azul como PWM. Escreva um código onde o potenciômetro atua
# como uma "balança" entre as duas cores:
# ● Se o potenciômetro estiver no zero, o LED fica 100% Vermelho e 0%
# Azul.
# ● Se estiver no máximo (65535), fica 0% Vermelho e 100% Azul.
# ● Em posições intermediárias, as duas cores se misturam
# proporcionalmente, criando tons de magenta/roxo. Dica: O duty
# cycle da cor Azul recebe o valor direto do potenciômetro, enquanto
# a cor Vermelha recebe a diferença matemática (65535 - valor lido).

from machine import Pin, PWM, ADC
from utime import sleep
red = PWM(Pin(16))
blue = PWM(Pin(18))
red.freq(1000)
blue.freq(1000)
pot = ADC(28)
while True:
    leitura = pot.read_u16()
    # Azul recebe a leitura direta
    blue.duty_u16(leitura)
    # Vermelho recebe a diferença
    red.duty_u16(65535 - leitura)
    sleep(0.05)