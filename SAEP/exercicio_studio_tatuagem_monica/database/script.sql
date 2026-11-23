CREATE DATABASE IF NOT EXISTS studio_tatuagem;
USE studio_tatuagem;

CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE clientes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL
    );

CREATE TABLE projetos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_projeto VARCHAR(50) NOT NULL,
    cliente_id INT NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    parte_do_corpo VARCHAR(255) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE sessoes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    projeto_id INT NOT NULL,
	data_agendamento DATETIME NOT NULL,
    data_sessao DATETIME NOT NULL,
    descricao_servico VARCHAR(100) NOT NULL,
    FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

INSERT INTO usuarios(nome, email, senha) VALUES
('Celso secretário', 'celso@studiotatuagem.com', '$2b$10$vZ3rIDynarjZ8tuu0i5F3.HdL0NGzPsmIsH.FborCvu715CtnGwMe'),
('Marlon tatuador', 'marlon@studiotatuagem.com', '$2b$10$vZ3rIDynarjZ8tuu0i5F3.HdL0NGzPsmIsH.FborCvu715CtnGwMe'),
('Daniel tatuador', 'daniel@studiotatuagem.com', '$2b$10$vZ3rIDynarjZ8tuu0i5F3.HdL0NGzPsmIsH.FborCvu715CtnGwMe');

INSERT INTO clientes(nome, cpf, telefone) VALUES

('Mônica Cotrim', 'c0f3621c0df0a7373441915a185a6dca', '(11) 8572-1111'),
('Letícia Souto', 'e665ec5c83c9521f70b5f9152f661315', '(11) 4252-2222'),
('Heloísa Gabrielly', '44e026646122e96e32845062a48210b5', '(11) 7526-3333');


INSERT INTO projetos(cliente_id, nome_projeto, descricao, parte_do_corpo) VALUES

(1, 'Tatuagem de abelha', 'Tatuagem de abelha com cerca de 20cm colorida', 'Lateral esquerda da barriga'),
(2, 'Tatuagem de joaninha', 'Tatuagem de joaninha com cerca de 1cm', 'Dedinho da mão esquerda'),
(3, 'Tatuagem de gato', 'Tatuagem de gato com cerca de 10cm colorido', 'Antebraço esquerdo');


INSERT INTO sessoes(projeto_id, data_sessao, descricao_servico) VALUES

(2,'2026-11-05 09:00:00', '2026-11-05 09:00:00', 'Tatuagem realizada por Marlon'),
(1,'2026-11-05 09:00:00', '2026-11-20 14:00:00', 'Tatuagem realizada por Daniel'),
(3,'2026-11-05 09:00:00', '2026-11-21 08:00:00', 'Tatuagem realizada por Marlon');

DROP DATABASE studio_tatuagem;