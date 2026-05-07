// =============================================================================
// ROTA DE AGENDAMENTOS
// =============================================================================

// Este método atualiza a reserva de uma sala
app.put('/res/alt/:id_res', async (req, res) => {
    // Pega o id
    const id = req.params.id_res
    // Pega o que veio no body
    const corpo = req.body

    // Verifica se a reserva existe lá no banco
    const r = await queryAsync("SELECT * FROM reservas WHERE id = ?", [id])

    // Se r for nada
    if (r.length === 0) {
        // Manda o erro
        res.send("erro 404")
    } else {
        // Se existir, checa se a data é maior que agora
        if (corpo.dt != "") {
            // Checa se a sala foi preenchida
            if (corpo.s > 0) {
                // Dá o update
                await queryAsync("UPDATE reservas SET ? WHERE id = ?", [corpo, id])
                // Avisa que foi
                res.send("alterado")
            } else {
                // Erro de sala
                res.send("erro sala")
            }
        } else {
            // Erro de data
            res.send("erro data")
        }
    }
})

// NOTA: Falta fazer o filtro de busca por data aqui