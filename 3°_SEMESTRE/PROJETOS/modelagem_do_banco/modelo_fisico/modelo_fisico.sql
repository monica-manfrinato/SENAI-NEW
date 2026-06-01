-- 1. Criação da database
CREATE DATABASE autonomoz_db;
USE  autonomoz_db;

-- 1. Tabela CARGOS
CREATE TABLE Cargos (
    id_cargo INT AUTO_INCREMENT PRIMARY KEY,
    tipo_cargo VARCHAR(30) NOT NULL,
    permissoes VARCHAR(100) NOT NULL
);

-- 2. Tabela USUÁRIOS
CREATE TABLE Usuarios (
    cpf VARCHAR(15) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_cargo INT NOT NULL,
    data_nascimento DATE NOT NULL,
    senha VARCHAR(50) NOT NULL UNIQUE,
    CONSTRAINT fk_usuarios_cargo FOREIGN KEY (id_cargo) REFERENCES Cargos(id_cargo)
);

-- 3. Tabela FORNECEDOR
CREATE TABLE Fornecedor (
    id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
    nome_fornecedor VARCHAR(60) NOT NULL
);

-- 4. Tabela LOCALIZACAO
CREATE TABLE Localizacao (
    id_localizacao INT AUTO_INCREMENT PRIMARY KEY,
    nome_localizacao VARCHAR(60) NOT NULL
);

-- 5. Tabela PRODUTO
CREATE TABLE Produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome_produto VARCHAR(60) NOT NULL,
    descricao VARCHAR(300),
    estoque_minimo INT NOT NULL
);

-- 6. Tabela CATEGORIA
CREATE TABLE Categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome_categoria VARCHAR(60) NOT NULL UNIQUE,
    fk_produto INT NOT NULL,
    CONSTRAINT fk_categoria_produto FOREIGN KEY (fk_produto) REFERENCES Produto(id_produto)
);

-- 7. Tabela SUB_CATEGORIA
CREATE TABLE Sub_Categoria (
    id_subcategoria INT AUTO_INCREMENT PRIMARY KEY,
    fk_categoria INT NOT NULL,
    nome_subcategoria VARCHAR(60) NOT NULL,
    CONSTRAINT fk_subcategoria_categoria FOREIGN KEY (fk_categoria) REFERENCES Categoria(id_categoria)
);

-- 8. Tabela LOTE_PRODUTO
CREATE TABLE Lote_Produto (
    codigo_lote INT PRIMARY KEY,
    fk_produto INT NOT NULL,
    quantidade INT NOT NULL,
    data_validade DATE NOT NULL,
    data_entrada_lote TIMESTAMP NOT NULL, -- TIMESTAMP pega data e horário (date pega só data)
    fk_localizacao INT NOT NULL,
    fk_fornecedor INT NOT NULL,
    status VARCHAR(30) NOT NULL,
    CONSTRAINT fk_lote_produto FOREIGN KEY (fk_produto) REFERENCES Produto(id_produto),
    CONSTRAINT fk_lote_localizacao FOREIGN KEY (fk_localizacao) REFERENCES Localizacao(id_localizacao),
    CONSTRAINT fk_lote_fornecedor FOREIGN KEY (fk_fornecedor) REFERENCES Fornecedor(id_fornecedor)
);

-- 9. Tabela ORDEM_PRODUCAO
CREATE TABLE Ordem_Producao (
    id_ordem_producao INT AUTO_INCREMENT PRIMARY KEY,
    descricao_servico VARCHAR(300) NOT NULL,
    data_inicio DATE NOT NULL,
    previsao_entrega DATE NOT NULL,
    data_entrega_final DATE,
    status VARCHAR(30) NOT NULL
);

-- 10. Tabela ORDEM_PRODUCAO_FUNCIONARIOS (Tabela Intermediária N:N)
CREATE TABLE Ordem_Producao_Funcionarios (
    fk_ordem_producao INT NOT NULL,
    fk_funcionario VARCHAR(15) NOT NULL,
    PRIMARY KEY (fk_ordem_producao, fk_funcionario),
    CONSTRAINT fk_opf_ordem FOREIGN KEY (fk_ordem_producao) REFERENCES Ordem_Producao(id_ordem_producao),
    CONSTRAINT fk_opf_funcionario FOREIGN KEY (fk_funcionario) REFERENCES Usuarios(cpf)
);

-- 11. Tabela MOVIMENTACAO
CREATE TABLE Movimentacao (
    id_movimentacao INT AUTO_INCREMENT PRIMARY KEY,
    fk_lote INT NOT NULL,
    fk_funcionario VARCHAR(15) NOT NULL,
    data_hora TIMESTAMP NOT NULL,
    tipo_movimento VARCHAR(30) NOT NULL,
    quantidade_movida INT NOT NULL,
    codigo_rastreio VARCHAR(20) NOT NULL UNIQUE,
    motivo_saida VARCHAR(30),
    fk_ordem_producao INT,
    CONSTRAINT fk_mov_lote FOREIGN KEY (fk_lote) REFERENCES Lote_Produto(codigo_lote),
    CONSTRAINT fk_mov_funcionario FOREIGN KEY (fk_funcionario) REFERENCES Usuarios(cpf),
    CONSTRAINT fk_mov_ordem FOREIGN KEY (fk_ordem_producao) REFERENCES Ordem_Producao(id_ordem_producao)
);