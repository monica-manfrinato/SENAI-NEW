# exercicio 08) Utilize 1 Push Button e 1 LED simples (com PWM). Ao contrário de um
# interruptor comum que acende a luz instantaneamente, programe o
# sistema para ter uma ignição suave. Quando o botão for clicado para
# ligar, o LED deve fazer um fade in (acender gradativamente de 0 a 100%
# usando um laço de repetição). Quando clicado para desligar, deve fazer
# um fade out (apagar gradativamente).

from machine import Pin, PWM
from utime import sleep

botao= Pin(17, Pin.IN)
led= PWM(Pin(16))
led.freq(1000)
led.duty_u16(0)
ultimo_estado = 1

while True:
    estado_botao = botao.value()

    if estado_botao == 1 and ultimo_estado == 1:
        ultimo_estado = ultimo_estado + 1
        for i in range(0, 65535, 1000): #aumenta do 0 até o 65535
            led.duty_u16(i)
            sleep(0.2)
            print("Ligando...")

    elif  estado_botao == 1 and ultimo_estado == 2:
        for o in range(65535, 0, -1000): #diminui do 65535 ao 0
            led.duty_u16(o)
            sleep(0.2)
            print("Desligando...")
            ultimo_estado == 1


#PROFESSOR:

# from machine import Pin, PWM
# from utime import sleep
# led = PWM(Pin(15))
# led.freq(1000)
# led.duty_u16(0)
# btn = Pin(14, Pin.IN, Pin.PULL_DOWN)
# ligado = False
# estado_ant = 0
# while True:
#     estado_atual = btn.value()
#     if estado_atual == 1 and estado_ant == 0:
#         ligado = not ligado # Inverte o estado
#         if ligado:
#             # Fade In
#             for i in range(0, 65535, 1000):
#             led.duty_u16(i)
#             sleep(0.01)
#         else:
#             # Fade Out
#             for i in range(65535, -1, -1000):
#                 if i < 0: i = 0
#                 led.duty_u16(i)
#                 sleep(0.01)

#     estado_ant = estado_atual
#     sleep(0.05)