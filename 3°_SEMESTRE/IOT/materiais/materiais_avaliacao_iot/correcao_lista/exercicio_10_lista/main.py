# Importa os componentes necessários
from machine import Pin, PWM, ADC
from utime import sleep

# --- CONFIGURAÇÃO DOS LEDS RGB (PWM) ---
red = PWM(Pin(16))     # LED vermelho no pino 16
green = PWM(Pin(17))   # LED verde no pino 17
blue = PWM(Pin(18))    # LED azul no pino 18

# Define a frequência do PWM (necessário pro controle de brilho)
red.freq(1000)
green.freq(1000)
blue.freq(1000)

# --- ENTRADAS ---
pot = ADC(28)  # Potenciômetro no pino 28 (analógico)

btn_cor = Pin(15, Pin.IN, Pin.PULL_DOWN)     # Botão para trocar cor
btn_efeito = Pin(19, Pin.IN, Pin.PULL_DOWN)  # Botão para trocar efeito

# --- VARIÁVEIS DE CONTROLE ---
modo_cor = 0       # 0 = vermelho | 1 = verde | 2 = azul
modo_efeito = 0    # 0 = fixo | 1 = piscando (⚠️ deveria ter 3 modos, já já te explico)

estado_cor_ant = 0      # Guarda estado anterior do botão de cor
estado_efeito_ant = 0   # Guarda estado anterior do botão de efeito

pisca_estado = False    # Controla se o LED está ligado/desligado no modo pisca

# --- LOOP PRINCIPAL ---
while True:

    # 1️⃣ --- LEITURA DOS BOTÕES ---
    est_cor = btn_cor.value()     # Lê botão de cor (0 ou 1)
    est_ef = btn_efeito.value()   # Lê botão de efeito

    # Detecta o "clique" (borda de subida: 0 → 1)
    if est_cor == 1 and estado_cor_ant == 0:
        modo_cor = (modo_cor + 1) % 3   # Alterna entre 0,1,2 (R,G,B)

    if est_ef == 1 and estado_efeito_ant == 0:
        modo_efeito = (modo_efeito + 1) % 2   # Alterna entre 0 e 1

    # Atualiza estado anterior (essencial pro debounce lógico)
    estado_cor_ant = est_cor
    estado_efeito_ant = est_ef

    # 2️⃣ --- CONTROLE DE BRILHO (POTENCIÔMETRO) ---
    intensidade = pot.read_u16()   # Valor de 0 a 65535

    # Se estiver no modo piscar
    if modo_efeito == 1:
        pisca_estado = not pisca_estado   # Inverte (liga/desliga)

        if pisca_estado == False:
            intensidade = 0   # Apaga o LED nesse ciclo

    # 3️⃣ --- ATUALIZA O LED RGB ---
    red.duty_u16(intensidade if modo_cor == 0 else 0)
    green.duty_u16(intensidade if modo_cor == 1 else 0)
    blue.duty_u16(intensidade if modo_cor == 2 else 0)

    # Delay geral (debounce + velocidade do pisca)
    sleep(0.15)