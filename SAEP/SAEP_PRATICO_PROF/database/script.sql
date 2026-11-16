CREATE DATABASE IF NOT EXISTS oficina;
USE oficina;

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
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE veiculos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    placa VARCHAR(10) NOT NULL,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    ano INT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE agendamentos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    veiculo_id INT NOT NULL,
    data_agendamento DATETIME NOT NULL,
    servico VARCHAR(100),
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
);

INSERT INTO usuarios(nome, email, senha) VALUES
('Administrador', 'admin@oficina.com', '$2b$10$m.AKGMbYj3ZYPJFdmMTGN.amcWwbpUSGfO/SsDg2cRnR6jeOK5hNy'),
('Carlos Mecânico', 'carlos@oficina.com', '$2b$10$m.AKGMbYj3ZYPJFdmMTGN.amcWwbpUSGfO/SsDg2cRnR6jeOK5hNy'),
('Fernanda Chefona', 'fernanda@oficina.com', '$2b$10$m.AKGMbYj3ZYPJFdmMTGN.amcWwbpUSGfO/SsDg2cRnR6jeOK5hNy');

INSERT INTO clientes(nome, cpf, telefone, email) VALUES

('João da Silva', 'b9332f3140efaf757e4d684975ef3365', '(11) 90000-1111','joao.silva@gmail.com'),
('Maria Souza', 'be4f639df4cd927594a5e3084b540dc1', '(11) 90000-222','maria.souza@gmail.com'),
('Pedro Oliveira', '65eea67226931d6bc95e431330183923', '(11) 90000-333','pedro.oliveira@gmail.com');


INSERT INTO veiculos(cliente_id, placa, marca, modelo, ano) VALUES

(1, 'ABC1D23', 'Volkswagen', 'Gol',2018),
(2, 'ABC1D23', 'Fiat', 'Uno',1967),
(3, 'ABC1D23', 'Chevrolet', 'Onix',2021);

INSERT INTO agendamentos(veiculo_id, data_agendamento, servico) VALUES

(2, '2026-11-05 09:00:00', 'Troca de oleo'),
(1, '2026-11-20 14:00:00', 'Alihamento e balnceamento'),
(3, '2026-11-21 08:00:00', 'Revisão dos freios');

SELECT * FROM clientes;
SELECT * FROM veiculos;
SELECT * FROM agendamentos;
DROP DATABASE oficina;
