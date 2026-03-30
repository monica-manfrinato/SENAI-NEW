#exercicio 5)Vamos juntar todos os componentes! Crie um sistema completo utilizando
# o Push Button, o Potenciômetro e o LED RGB:
# ● O Push Button funcionará como um seletor de "Modo" (cor). Cada
# vez que for clicado, ele muda a cor ativa do sistema na seguinte
# ordem: Vermelho -> Verde -> Azul -> Volta pro Vermelho.
# ● O Potenciômetro ajustará o brilho (via PWM) exclusivamente da cor
# que estiver selecionada no momento pelo botão. As outras duas
# cores do LED RGB devem permanecer totalmente apagadas.

from machine import Pin, PWM, ADC
from utime import sleep

pot = ADC(28)
red = PWM(Pin(16))
green = PWM(Pin(17))
blue = PWM(Pin(18))
button = Pin(15, Pin.IN)

red.freq(1000)
green.freq(1000)
blue.freq(1000)

estado_botao = 0

while True:
     leitura_pot = pot.read_u16()

     if button.value() == 1:
         estado_botao = estado_botao + 1
         if estado_botao > 3:
            estado_botao = 1
         sleep(0.3)

     if estado_botao == 1:
         red.duty_u16(leitura_pot)
         green.duty_u16(0)
         blue.duty_u16(0)

     elif estado_botao == 2:
         green.duty_u16(leitura_pot)
         blue.duty_u16(0)
         red.duty_u16(0)



     elif estado_botao == 3:
         blue.duty_u16(leitura_pot)
         red.duty_u16(0)
         green.duty_u16(0)        

     elif estado_botao == 0:
         blue.duty_u16(0)
         red.duty_u16(0)
         green.duty_u16(0)



#VERSÃO PROFESSOR:

# from machine import Pin, PWM, ADC
# from utime import sleep
# red = PWM(Pin(13))
# green = PWM(Pin(14))
# blue = PWM(Pin(15))

# # Declaração explícita de frequência e duty cycle inicial
# red.freq(1000)
# red.duty_u16(0)
# green.freq(1000)
# green.duty_u16(0)
# blue.freq(1000)
# blue.duty_u16(0)
# potenciometro = ADC(26)
# btn = Pin(12, Pin.IN, Pin.PULL_DOWN)
# cor_ativa = 0
# estado_ant = 0

# while True:
#     estado_atual = btn.value()
#     # Verifica clique (transição de 0 para 1)
#     if estado_atual == 1 and estado_ant == 0:
#         cor_ativa += 1
#             if cor_ativa > 2:
#                 cor_ativa = 0
#     estado_ant = estado_atual
#     brilho = potenciometro.read_u16()
#     if cor_ativa == 0:
#         red.duty_u16(brilho)
#         green.duty_u16(0)
#         blue.duty_u16(0)
#     elif cor_ativa == 1:
#         red.duty_u16(0)
#         green.duty_u16(brilho)
#         blue.duty_u16(0)
#     elif cor_ativa == 2:
#         red.duty_u16(0)
#         green.duty_u16(0)
#         blue.duty_u16(brilho)
#     sleep(0.05)