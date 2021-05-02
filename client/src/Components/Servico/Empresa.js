import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel'
import * as CidadeAPI from '../../API/CidadeAPI';
import * as SetorAPI from '../../API/SetorAPI';
import * as EmpresaAPI from '../../API/EmpresaAPI';
import AuthContext from '../../Context/Auth';
import Snackbars from '../Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    dropboxTitle: {
        marginTop: '17px',
    },
    dropbox: {
        marginTop: '5px',
    }
}));

export default function Empresa() {
    const classes = useStyles();
    const [id, setId] = React.useState(0);
    const [cidade_id, setCidadeId] = React.useState(-1);
    const [setor_id, setSetorId] = React.useState(-1);
    const [setores, setSetores] = React.useState([]);
    const [cidades, setCidades] = React.useState([]);
    const [nome, setNome] = React.useState("");
    const [descricao, setDescricao] = React.useState("");
    const authContext = useContext(AuthContext);
    const [mensagem, setMensagem] = React.useState('');
    const [tipo, setTipo] = React.useState(0);
    const [alertID, setalertID] = React.useState(0);

    const callAlert = (t, m, i) => {
        setTipo(t);
        setMensagem(m);
        setalertID(i);
    }

    useEffect(() => {
        async function getCidades() {
            let response = await CidadeAPI.getAll()
            setCidades(response)
        }

        async function getEmpresa() {
            let response = await EmpresaAPI.getByCliente(authContext.idCliente);
            console.log(response.nome)
            if (response) {
                setId(response.id);
                setNome(response.nome);
                setDescricao(response.descricao);
                setCidadeId(response.cidade_id)
                setSetorId(response.setor_id)
            }
        }

        getCidades();
        getEmpresa();
    }, [authContext.idCliente]);

    useEffect(() => {
        async function getSetores() {
            let response = await SetorAPI.getByCidade(cidade_id)
            setSetores(response)
        }

        if (cidade_id > -1)
            getSetores();
    }, [cidade_id]);

    useEffect(() => { }, [nome, descricao]);

    const handleChangeCidade = (event) => {
        const target = event.target;
        setCidadeId(target.value);
    }

    const handleChangeSetor = (event) => {
        const target = event.target;
        setSetorId(target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const cliente_id = authContext.idCliente;
        if (id !== 0) {
            EmpresaAPI.update(id, {
                nome,
                descricao,
                cliente_id,
                cidade_id,
                setor_id
            }).then(res => {
                callAlert(0, res.message, alertID + 1);
            }).catch(error => {
                callAlert(1, error.response.message, alertID + 1);
            });
        } else {
            EmpresaAPI.add({
                nome,
                descricao,
                cliente_id,
                cidade_id,
                setor_id
            }).then(res => {
                callAlert(0, res.message, alertID + 1);
                setId(0);
                setNome("");
                setDescricao("");
                setCidadeId(-1)
                setSetorId(-1)
            }).catch(error => {
                callAlert(1, error.response.message, alertID + 1);
            });
        }
    }

    const handleChangeNome = (event) => {
        const target = event.target;
        setNome(target.value);
    }

    const handleChangeDescricao = (event) => {
        const target = event.target;
        setDescricao(target.value);
    }

    const handleDelete = (event) => {
        event.preventDefault();
        EmpresaAPI.deleteById(id)
        .then(res => {
            callAlert(0, res.message, alertID + 1);
        }).catch(error => {
            callAlert(1, error.response.message, alertID + 1);
        });
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5" className={classes.paper}>
                    Empresa
        		    </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Nome"
                                value={nome}
                                autoFocus
                                onChange={handleChangeNome}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="Descricao"
                                label="Descrição"
                                type="Descricao"
                                id="Descricao"
                                autoComplete="Descricao"
                                defaultValue={descricao}
                                multiline
                                rows={3}
                                onChange={handleChangeDescricao}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <InputLabel className={classes.dropboxTitle} id="cidade_id">Cidade</InputLabel>
                        <Select
                            className={classes.dropbox}
                            variant="outlined"
                            labelId="cidade_id"
                            id="cidade_id"
                            value={cidade_id}
                            fullWidth
                            onChange={handleChangeCidade}>
                            {cidades.map(cidade =>
                                <MenuItem key={cidade.id}
                                    value={cidade.id}>
                                    {cidade.nome + '/' + cidade.uf}
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid container spacing={0}>
                        <InputLabel className={classes.dropboxTitle} id="setor_id">Setor</InputLabel>
                        <Select
                            className={classes.dropbox}
                            variant="outlined"
                            labelId="setor_id"
                            id="setor_id"
                            value={setor_id}
                            fullWidth
                            onChange={handleChangeSetor}>
                            {setores.map(setor =>
                                <MenuItem
                                    key={setor.id}
                                    value={setor.id}>
                                    {setor.descricao}
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmit}
                            >
                                Salvar
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                onClick={handleDelete}
                            >
                                Apagar
          			        </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
            <Snackbars mensagem={mensagem} tipo={tipo} id={alertID} />
        </div>
    );
}