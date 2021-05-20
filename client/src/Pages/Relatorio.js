import React, { useState, useEffect, useContext } from 'react';
import { Chart } from "react-google-charts";
import { makeStyles } from '@material-ui/core/styles';
import * as relatorioAPI from '../API/RelatorioAPI';
import AuthContext from '../Context/Auth';
import Typography from '@material-ui/core/Typography';

const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
    },
    center: {
        margin: theme.spacing(1),
        maxWidth: 600,
        textAlign: 'left',
        display: 'inline-block',
    },
}));

function Relatorio() {
    const classes = useStyles();
    const [optionsNovosClientes, setOptionsNovosClientes] = useState({})
    const [dataNovosClientes, setDataNovosClientes] = useState([])
    const authContext = useContext(AuthContext);

    async function getRelatorioNovosClientes() {
        setOptionsNovosClientes({
            title: 'Novos Clientes'
        });

        let response = await relatorioAPI.getRelatorio(1);

        setDataNovosClientes([
            ['Mês', 'Quantidade'],
            ...response.map(e => [meses[e.mes], parseInt(e.quantidade)])
        ])
    }

    /********************************************/

    const [optionsNovosServicos, setOptionsNovosServicos] = useState({})
    const [dataNovosServicos, setDataNovosServicos] = useState([])

    async function getRelatorioNovosServicos() {
        setOptionsNovosServicos({
            title: 'Novos Servicos'
        });

        let response = await relatorioAPI.getRelatorio(2);

        setDataNovosServicos([
            ['Mês', 'Quantidade'],
            ...response.map(e => [meses[e.mes], parseInt(e.quantidade)])
        ])
    }

    /********************************************/

    const [optionsEmpresaCidade, setOptionsEmpresaCidade] = useState({})
    const [dataEmpresaCidade, setDataEmpresaCidade] = useState([])

    async function getRelatorioEmpresaCidade() {
        setOptionsEmpresaCidade({
            title: 'Empresas / Cidade'
        });

        let response = await relatorioAPI.getRelatorio(3);

        setDataEmpresaCidade([
            ['Cidade', 'Empresas'],
            ...response.map(e => [e.nome, parseInt(e.quantidade)])
        ])
    }

    /********************************************/

    const [optionsServicosCidade, setOptionsServicosCidade] = useState({})
    const [dataServicosCidade, setDataServicosCidade] = useState([])

    async function getRelatorioServicosCidade() {
        setOptionsServicosCidade({
            title: 'Serviços / Cidade'
        });

        let response = await relatorioAPI.getRelatorio(4);

        setDataServicosCidade([
            ['Cidade', 'Serviços'],
            ...response.map(e => [e.nome, parseInt(e.quantidade)])
        ])
    }

    /********************************************/

    const [optionsServicosSetor, setOptionsServicosSetor] = useState({})
    const [dataServicosSetor, setDataServicosSetor] = useState([])

    async function getRelatorioServicosSetor() {
        setOptionsServicosSetor({
            title: 'Serviços / Setor'
        });

        let response = await relatorioAPI.getRelatorio(5);

        setDataServicosSetor([
            ['Cidade', 'Setores'],
            ...response.map(e => [e.descricao, parseInt(e.quantidade)])
        ])
    }

    /********************************************/

    useEffect(() => {
        getRelatorioNovosClientes();
        getRelatorioNovosServicos();
        getRelatorioEmpresaCidade();
        getRelatorioServicosCidade();
        getRelatorioServicosSetor();
    }, []);

    return (
        <div>
            {
                authContext.perfil !== 1 ? (
                    <div>
                        <Typography component="h1" variant="h5">
                            Acesso negado.
        		        </Typography>
                    </div>
                ) : (
                    <div className={classes.root}>
                        <div className={classes.center}>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                id='Novos clientes (Últimos meses)'
                                data={dataNovosClientes}
                                options={optionsNovosClientes}
                            />
                        </div>

                        <br />

                        <div className={classes.center}>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                id='Novos serviços'
                                data={dataNovosServicos}
                                options={optionsNovosServicos}
                            />
                        </div>

                        <br />

                        <div className={classes.center}>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                id='Empresas / cidade'
                                data={dataEmpresaCidade}
                                options={optionsEmpresaCidade}
                            />
                        </div>

                        <br />

                        <div className={classes.center}>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                id='Serviços / cidade'
                                data={dataServicosCidade}
                                options={optionsServicosCidade}
                            />
                        </div>

                        <br />

                        <div className={classes.center}>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                id='Serviços / Setor'
                                data={dataServicosSetor}
                                options={optionsServicosSetor}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Relatorio;