#exercicio 2)Modifique o circuito anterior. Agora, em vez de apenas ligar e desligar,
#  use a biblioteca machine.PWM no pino do LED. Crie um laço de repetição (for
# ou while) que aumente e diminua o duty cycle gradativamente, criando
# um efeito de "respiração" (fade in / fade out) contínuo no LED.




from machine import Pin, PWM
from utime import sleep

LED = PWM(Pin(16))
LED.freq(1000)

while True:
    for duty in range (0, 65535, 500):#ligar led de 0 à 65535 de 500 em 500
        LED.duty_u16(duty)
        print('Ligando...')
        sleep(0.02)
    
    for duty in range (65535, 0, -500):#ligar led de 0 à 65535 de 500 em 500
        LED.duty_u16(duty)
        print('Desligando...')
        sleep(0.02)