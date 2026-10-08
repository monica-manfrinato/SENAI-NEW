-- Script de criação do banco de dados e tabelas - Cantina Bella Vita
DROP DATABASE sabordigital_b;
-- 1. Criação do Banco de Dados
CREATE DATABASE IF NOT EXISTS sabordigital_b;
USE sabordigital_b;

-- 2. Tabela de Produto (Prato/Bebida)
CREATE TABLE IF NOT EXISTS produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(50) DEFAULT NULL,
    disponivel BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Tabela de Cardápio
CREATE TABLE IF NOT EXISTS cardapio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    disponivel BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Tabela Associativa Produto-Cardápio (N:M)
CREATE TABLE IF NOT EXISTS cardapio_produto (
    cardapio_id INT NOT NULL,
    produto_id INT NOT NULL,
    PRIMARY KEY (cardapio_id, produto_id),
    FOREIGN KEY (cardapio_id) REFERENCES cardapio(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produto(id) ON DELETE CASCADE
);

-- 5. Tabela de Pedido
CREATE TABLE IF NOT EXISTS pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(100) DEFAULT NULL,
    status ENUM('pendente', 'preparo', 'pronto', 'entregue') DEFAULT 'pendente',
    total DECIMAL(10, 2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criar a tabela de utilizadores
CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    papel ENUM('admin', 'cliente') DEFAULT 'cliente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserir utilizadores iniciais para testes
INSERT INTO usuario (nome, email, senha, papel) VALUES 
('Administrador', 'admin@sabor.com', '123456', 'admin'),
('Cliente Teste', 'cliente@sabor.com', '123456', 'cliente');

-- 6. Tabela de Itens do Pedido (N:M com Produto)
CREATE TABLE IF NOT EXISTS item_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    preco_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produto(id) ON DELETE RESTRICT
);

-- População inicial (Opcional)
INSERT INTO produto (nome, descricao, preco, categoria, disponivel) VALUES 
('Espaguete à Bolonhesa', 'Massa com molho de tomate e carne moída', 35.50, 'Massa', true),
('Lasanha de Frango', 'Lasanha com frango desfiado e queijo', 42.00, 'Massa', true),
('Pizza Margherita', 'Pizza de mussarela, tomate e manjericão', 50.00, 'Pizza', true),
('Suco de Laranja', 'Suco natural 500ml', 12.00, 'Bebida', true);

ALTER TABLE produto ADD COLUMN imagem VARCHAR(255);
SELECT * FROM produto;


-- 1. Criar um cardápio inicial
INSERT INTO cardapio (nome, descricao, disponivel) VALUES 
('Cardápio Principal', 'A seleção dos melhores pratos da casa', true);

-- 2. Associar os produtos (IDs 1, 2, 3, 4) a este cardápio (ID 1)
INSERT INTO cardapio_produto (cardapio_id, produto_id) VALUES 
(1, 1), -- Espaguete à Bolonhesa
(1, 2), -- Lasanha de Frango
(1, 3), -- Pizza Margherita
(1, 4); -- Suco de Laranja
