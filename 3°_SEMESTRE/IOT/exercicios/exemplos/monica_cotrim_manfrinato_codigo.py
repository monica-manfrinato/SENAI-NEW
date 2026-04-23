from machine import Pin
from utime import sleep

led_vermelho = Pin(18, Pin.OUT)
led_amarelo = Pin(17, Pin.OUT)
led_verde = Pin(16, Pin.OUT)

btn_down = Pin(15, Pin.IN)
btn_up = Pin(14, Pin.IN)

carga = 0
estado = 'parado'
ultimo_estado_down = 0
ultimo_estado_up = 1

while True:

    estado_atual_botao_down = btn_down.value()
    estado_atual_botao_up = btn_up.value()

    if estado_atual_botao_down == 1 and ultimo_estado_down == 0:
        estado = 'carregando'
        print('Carregador conectado! ')
        sleep(0.5)
        if carga < 100:
            carga = carga + 5
            print(f"Nível da Bateria: {carga}%")
            sleep(0.5)
    ultimo_estado_down = estado_atual_botao_down         
        

    if estado_atual_botao_up == 0 and ultimo_estado_up == 1:
        estado = 'Descarregando'
        print('Motor Ligado - Consumindo Bateria')
        sleep(0.5)
        if carga <= 100:
            carga = carga - 5
            print(f"Nível da Bateria: {carga}%")
            sleep(0.5)
    ultimo_estado_up = estado_atual_botao_up


    #Verificação da carga e ascendendo os leds

    if carga < 20:
        led_vermelho.on()
        led_amarelo.off()
        led_verde.off()
    
    elif carga >= 20 and carga < 80:
        led_vermelho.off()
        led_amarelo.on()
        led_verde.off()

    elif carga >=80 and carga <=100:
        led_vermelho.off()
        led_amarelo.off()
        led_verde.on()