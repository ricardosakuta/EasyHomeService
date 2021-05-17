const { pool } = require('../db/config')

exports.getRelatorio = async (req, res) => {
    let sql = '';
    const opcao = parseInt(req.params.opcao);

    console.log(req.params.opcao);

    switch (opcao) {
        case 1:
            // Novos Clientes
            sql = `select EXTRACT(MONTH FROM data_criacao) as mes, count(*) as quantidade
                    from cliente
                    where EXTRACT(MONTH FROM data_criacao) > EXTRACT(MONTH FROM current_timestamp) - 3
                    group by mes`;
            break;

        case 2:
            // Novos Servicos
            sql = `select EXTRACT(MONTH FROM data_criacao) as mes, count(*) as quantidade
                    from servico
                    where EXTRACT(MONTH FROM data_criacao) > EXTRACT(MONTH FROM current_timestamp) - 3
                    group by mes;`;
            break;

        case 3:
            // Empresas / Cidade
            sql = `select c.nome, count(*) as quantidade
                    from empresa e
                    join cidade c on (c.id = e.cidade_id)
                    group by c.nome`;
            break;

        case 4:
            // Serviços / Cidade
            sql = `select c.nome, count(*) as quantidade
                    from servico s
                    join empresa e on (e.id = s.empresa_id)
                    join cidade c on (c.id = e.cidade_id)
                    group by c.nome`;
            break;

        case 5:
            // Serviços / Setor
            sql = `select st.descricao, count(*) as quantidade
                    from servico sc
                    join empresa e on (e.id = sc.empresa_id)
                    join setor st on (st.id = e.setor_id)
                    group by st.descricao`;
            break;
    }

    pool.query(sql,
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
}


