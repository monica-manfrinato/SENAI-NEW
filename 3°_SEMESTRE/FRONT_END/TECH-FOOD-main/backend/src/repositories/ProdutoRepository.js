const pool = require('../config/database');

class ProdutoRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM produto ORDER BY id DESC');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM produto WHERE id = ?', [id]);
        return rows[0];
    }

async cadastrarProduto(produto) {
    const sql = `
      INSERT INTO produto (nome, descricao, preco, categoria, disponivel, imagem)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      produto.nome,
      produto.descricao,
      produto.preco,
      produto.categoria,
      produto.disponivel,
      produto.imagem // ← aqui vem "uploads/arquivo.jpg"
    ];
    const [resultado] = await pool.query(sql, params);
    return resultado.insertId;
}

    async update(id, produtoData) {
        const fields = [];
        const values = [];
        for (const [key, value] of Object.entries(produtoData)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
        if (fields.length === 0) return null;

        values.push(id);
        const query = `UPDATE produto SET ${fields.join(', ')} WHERE id = ?`;
        const [result] = await pool.query(query, values);
        return result.affectedRows;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM produto WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = new ProdutoRepository();
