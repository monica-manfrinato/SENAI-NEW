# Passo 3: Lógica e Interatividade (Código)
# [ X] Crie uma variável carga = 0 (varia de 0 a 100%) e uma variável estado = "parado".
# [ ] Botão 1 (PULL_DOWN): Se clicado, alterna o estado entre "carregando" e "parado".
 #Terminal: print("Carregador Conectado!") ou print("Carregador Desconectado!").
# [X ] Botão 2 (PULL_UP): Se clicado, alterna o estado entre "descarregando" e "parado".
 #Terminal: print("Motor Ligado - Consumindo Bateria") ou print("Motor Desligado").
# [X ] Laço while (Enchendo e Esvaziando sozinho):
# Se "carregando", carga sobe automaticamente de 5 em 5. (Trave no limite máximo de 100).
# Se "descarregando", carga desce automaticamente de 5 em 5. (Trave no limite mínimo de 0).
# Mostre no Terminal: print(f"Nível da Bateria: {carga}%").
# [ ] LEDs (baseado na carga):
# < 20%: Só Vermelho (Bateria Fraca).
# Entre 20% e 80%: Só Amarelo (Bateria Média).
# 80%: Só Verde (Bateria Cheia).



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




    # # --- BOTÃO DE AUMENTAR BRILHO ---
    # if btn_mais.value() == 1:  # Se o botão "mais" for pressionado
    #     brilho += passo        # Aumenta o brilho

    # if brilho > 65535:         # Se passar do máximo permitido
    #     brilho = 65535         # Limita no valor máximo

    # led.duty_u16(brilho)       # Aplica o brilho no LED

    # sleep(0.2)                 # Pequeno atraso (debounce do botão)

    # # --- BOTÃO DE DIMINUIR BRILHO ---
    # if btn_menos.value() == 1: # Se o botão "menos" for pressionado
    #     brilho -= passo        # Diminui o brilho

    # if brilho < 0:             # Se ficar menor que zero
    #     brilho = 0             # Limita no mínimo (apagado)

    # led.duty_u16(brilho)       # Atualiza o brilho do LED

    # sleep(0.2)                 # Outro atraso (debounce)


# while True:

#     if btn_down.value() == 1:
#         estado = 'carregando'
#         print('Carregador conectado!')
#         if carga < 100:
#             carga = carga + 5
#             print(f"Nível da Bateria: {carga}%")
#             sleep(0.5)

#     elif estado == 'parado':
#         print('Carregador desconectado!')
#         sleep(0.5)

#     elif btn_up.value() == 0:
#         estado = 'descarregando'
#         print('Motor Ligado - Consumindo Bateria')

#     elif estado == 'descarregando':
#         if carga >= 100:
#             carga = carga - 5
#             print(f"Nível da Bateria: {carga}%")
#             sleep(0.5)
#     else:
#         estado = 'parado'
#         print('Motor desligado')
#         sleep(0.5)

#     #Verificação da carga e ascendendo os leds

#     if carga < 20:
#         led_vermelho.on()
#         led_amarelo.off()
#         led_verde.off()
    
#     elif carga >= 20 and carga < 80:
#         led_vermelho.off()
#         led_amarelo.on()
#         led_verde.off()

#     elif carga >=80 and carga <=100:
#         led_vermelho.off()
#         led_amarelo.off()
#         led_verde.on()



# while True:

#     if btn_down.value() == 1:
#         estado = 'carregando'
#         print('Carregador conectado!')
#         while carga <100:
#             carga = carga + 5
#             print(f"Nível da Bateria: {carga}%")
#             sleep(0.5)
            
#     elif estado == 'parado':
#         print('Carregador desconectado!')
#         sleep(0.5)

#     elif btn_up.value() == 0:
#         estado = 'descarregando'
#         print('Motor Ligado - Consumindo Bateria')

#     elif estado == 'descarregando':
#         if carga >= 100:
#             carga = carga - 5
#             print(f"Nível da Bateria: {carga}%")
#             sleep(0.5)
#     else:
#         estado = 'parado'
#         print('Motor desligado')
#         sleep(0.5)
