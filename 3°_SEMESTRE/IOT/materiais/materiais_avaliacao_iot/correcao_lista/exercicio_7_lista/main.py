#exercicio 07)Adicione 2 Push Buttons à protoboard e mantenha 1 LED simples
# configurado como saída PWM. Escreva um programa onde o Botão 1 atua
# como "Aumentar Brilho" e o Botão 2 como "Diminuir Brilho". Cada vez que
# um botão for pressionado, o duty cycle do LED deve aumentar ou diminuir
# em passos (por exemplo, de 10% em 10%). Dica: Você precisará de uma
# variável para armazenar o nível de brilho atual e de estruturas
# condicionais (if) para garantir que o valor não passe do limite máximo
# (65535) nem caia abaixo de zero.


from machine import Pin, PWM   # Importa classes para controlar pinos e PWM (controle de brilho)
from utime import sleep        # Importa função de pausa (delay)

led = PWM(Pin(16))             # Define o pino 16 como saída PWM (LED com controle de brilho)
led.freq(1000)                 # Define a frequência do PWM (1000 Hz)

btn_mais = Pin(17, Pin.IN, Pin.PULL_DOWN)   # Botão no pino 17 (entrada) com resistor pull-down
btn_menos = Pin(18, Pin.IN, Pin.PULL_DOWN)  # Botão no pino 18 (entrada) com resistor pull-down

brilho = 0                     # Variável que guarda o brilho atual (0 = apagado)
passo = 6553                   # Valor que aumenta/diminui o brilho (~10% de 65535)

while True:                    # Loop infinito (o código roda pra sempre)

    # --- BOTÃO DE AUMENTAR BRILHO ---
    if btn_mais.value() == 1:  # Se o botão "mais" for pressionado
        brilho += passo        # Aumenta o brilho

    if brilho > 65535:         # Se passar do máximo permitido
        brilho = 65535         # Limita no valor máximo

    led.duty_u16(brilho)       # Aplica o brilho no LED

    sleep(0.2)                 # Pequeno atraso (debounce do botão)

    # --- BOTÃO DE DIMINUIR BRILHO ---
    if btn_menos.value() == 1: # Se o botão "menos" for pressionado
        brilho -= passo        # Diminui o brilho

    if brilho < 0:             # Se ficar menor que zero
        brilho = 0             # Limita no mínimo (apagado)

    led.duty_u16(brilho)       # Atualiza o brilho do LED

    sleep(0.2)                 # Outro atraso (debounce)