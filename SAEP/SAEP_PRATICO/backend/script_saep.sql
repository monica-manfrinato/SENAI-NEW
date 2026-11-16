-- Script do banco de dados da oficina (SAEP)
CREATE DATABASE IF NOT EXISTS saep_db;
USE saep_db;

-- 1. Tabela USUARIO
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- 2. Tabela CLIENTE
CREATE TABLE IF NOT EXISTS cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(255) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

-- 3. Tabela VEICULO
CREATE TABLE IF NOT EXISTS veiculo (
    id_veiculo INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    placa VARCHAR(10) NOT NULL UNIQUE,
    id_cliente INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente) ON DELETE CASCADE
);

-- 4. Tabela AGENDAMENTO
CREATE TABLE IF NOT EXISTS agendamento (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_agendamento DATETIME NOT NULL,
    descricao_servico VARCHAR(255) NOT NULL,
    id_veiculo INT NOT NULL,
    FOREIGN KEY (id_veiculo) REFERENCES veiculo(id_veiculo) ON DELETE CASCADE
);

-- =========================================================
-- INSERÇÃO DE DADOS INICIAIS
-- =========================================================

-- Inserir Clientes
INSERT INTO cliente (cpf, nome, telefone) VALUES 
('123.456.789-01', 'Lucas Pereira', '(11) 98765-4321'),
('987.654.321-00', 'Mariana Lima', '(11) 91234-5678'),
('456.789.123-11', 'Felipe Gomes', '(11) 97777-8888');

-- Inserir Veículos
INSERT INTO veiculo (modelo, marca, placa, id_cliente) VALUES 
('Civic', 'Honda', 'ABC1D23', 1),
('Fit', 'Honda', 'XYZ9K87', 1),
('Gol', 'Volkswagen', 'KLM4F56', 2);

-- Inserir Agendamentos
INSERT INTO agendamento (data_agendamento, descricao_servico, id_veiculo) VALUES 
('2026-11-10 09:00:00', 'Troca de óleo e substituição do filtro', 1),
('2026-11-12 14:30:00', 'Revisão completa do sistema de freios', 2),
('2026-11-15 10:00:00', 'Alinhamento, balanceamento e troca de pneus', 3);

-- Inserir Usuário (Utilizando o Hash Bcrypt gerado)
INSERT INTO usuario (nome, email, senha) VALUES 
('Administrador', 'admin@oficina.com', '$2b$10$CWoF1Ihc7N9Nnn2TOwi0hutcqMJocFIPcORMbYJrFH95P02LiUbT6');