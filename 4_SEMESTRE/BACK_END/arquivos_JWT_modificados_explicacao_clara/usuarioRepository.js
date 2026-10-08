// ==============================================================================
// REPOSITORY DE USUÁRIOS (UsuarioRepository.js)
// Arquitetura MVC: Camada de Acesso a Dados (Data Access Layer - DAO)
//
// OBJETIVO PARA A PROVA:
// O Repository é o ÚNICO lugar da aplicação que executa comandos SQL no banco de dados.
// Ele isola as queries da regra de negócio (Service). Se o banco mudar do MySQL para PostgreSQL,
// apenas este arquivo precisa ser alterado!
// ==============================================================================

const pool = require('../config/database'); // Importa o pool de conexões do MySQL (com suporte a Promises/async-await)

class UsuarioRepository {

    // --------------------------------------------------------------------------
    // 1. MÉTODO: findByEmail
    // Uso Principal: Autenticação (Login) e Validação de E-mail duplicado
    // --------------------------------------------------------------------------
    async findByEmail(email) {
        // CONCEITO DE PROVA - PREVENÇÃO DE SQL INJECTION:
        // Usamos o caractere '?' (PreparedStatement). O driver do MySQL trata a variável 'email'
        // limpando caracteres maliciosos antes de executar a query. NUNCA concatene variáveis diretamente no SQL!
        // [rows]: Desestrutura a resposta do pool.query para pegar o array de resultados da busca.
        const [rows] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
        
        // Retorna o primeiro usuário encontrado (rows[0]) ou 'undefined' se o e-mail não existir no banco.
        return rows[0];
    }

    // --------------------------------------------------------------------------
    // 2. MÉTODO: findById
    // Uso Principal: Busca de perfil por ID
    // --------------------------------------------------------------------------
    async findById(id) {
        // SEGURANÇA NA PROVA:
        // Note que explicitamos 'SELECT id, nome, email, papel, criado_em' e OMITIMOS o campo 'senha'.
        // Isso impede que a senha hash vazes acidentalmente para o front-end em consultas de perfil.
        const [rows] = await pool.query(
            'SELECT id, nome, email, papel, criado_em FROM usuario WHERE id = ?', 
            [id]
        );
        
        // Se a busca retornar um array vazio, significa que o ID não existe na tabela.
        if (rows.length === 0) return null;
        
        return rows[0];
    }

    // --------------------------------------------------------------------------
    // 3. MÉTODO: create
    // Uso Principal: Cadastro de novos usuários (/auth/registrar)
    // --------------------------------------------------------------------------
    async create(usuarioData) {
        const { nome, email, senha, papel } = usuarioData;
        
        // CONCEITO DE PROVA - VALOR DEFAULT DE PAPEL (RBAC):
        // Se o valor de 'papel' vier undefined/null na requisição, o operador '||' aplica 'cliente' como padrão.
        // Isso garante que nenhum usuário se cadastre como 'admin' acidentalmente sem permissão explícita.
        const [result] = await pool.query(
            'INSERT INTO usuario (nome, email, senha, papel) VALUES (?, ?, ?, ?)',
            [nome, email, senha, papel || 'cliente']
        );
        
        // result.insertId: Propriedade nativa do MySQL que retorna a Chave Primária (ID) auto-incrementada que acabou de ser gerada.
        return result.insertId;
    }

    // --------------------------------------------------------------------------
    // 4. MÉTODO: update (Montagem Dinâmica de Query)
    // Uso Principal: Atualização parcial de dados do usuário
    // --------------------------------------------------------------------------
    async update(id, usuarioData) {
        const fields = [];
        const values = [];

        // Itera sobre as chaves/valores do objeto para alterar apenas os campos fornecidos
        for (const [key, value] of Object.entries(usuarioData)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }

        // Se nenhum campo válido foi enviado para atualização
        if (fields.length === 0) return null;

        values.push(id); // Adiciona o ID no final da lista de parâmetros para o WHERE

        // Junta os campos separados por vírgula (ex: "nome = ?, email = ?")
        const query = `UPDATE usuario SET ${fields.join(', ')} WHERE id = ?`;
        
        const [result] = await pool.query(query, values);
        
        // result.affectedRows: Retorna a quantidade de linhas modificadas no banco (1 se alterou, 0 se ID não existia).
        return result.affectedRows;
    }

    // --------------------------------------------------------------------------
    // 5. MÉTODO: delete
    // Uso Principal: Exclusão de conta (Apenas Admin)
    // --------------------------------------------------------------------------
    async delete(id) {
        const [result] = await pool.query('DELETE FROM usuario WHERE id = ?', [id]);
        return result.affectedRows; // Retorna 1 se deletou com sucesso, 0 se não encontrou.
    }
}

// ------------------------------------------------------------------------------
// EXPORTAÇÃO DO REPOSITORY
// ------------------------------------------------------------------------------
// Instanciamos e exportamos a classe pronta (Padrão Singleton) para ser consumida no UsuarioService.
module.exports = new UsuarioRepository();