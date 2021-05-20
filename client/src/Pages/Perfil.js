import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as UsuarioAPI from '../API/UsuarioAPI';
import Snackbars from '../Components/Alert';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

export default function Perfil(props) {
	const classes = useStyles();
	const [id, setId] = React.useState(0);
	const [perfil_id, setPerfilID] = React.useState(-1);
	const [perfis, setPerfis] = React.useState([]);
	const [nome, setNome] = React.useState("");
    const history = useHistory();
    const location = useLocation();

    const [mensagem, setMensagem] = React.useState('');
    const [tipo, setTipo] = React.useState(0);
    const [alertID, setalertID] = React.useState(0);

    const callAlert = (t, m, i) => {
        setTipo(t);
        setMensagem(m);
        setalertID(i);
    }

    useEffect(() => {
        setNome(location.state.res.nome);
        setPerfilID(location.state.res.perfil_id)
        setId(location.state.res.id)

        setPerfis([
            {"id": 0, "descricao": "Administrador do sistema"},
            {"id": 1, "descricao": "Gerente"},
            {"id": 2, "descricao": "Cliente"}
        ]);
      }, [location]);

	const handleChangePerfil = (event) => {
		const target = event.target;
		setPerfilID(target.value);
	}

	const handleCancel = () => {
		history.push('funcionario');
	}

	const handleSubmit = (event) => {
        event.preventDefault();
		console.log("ID: " + id)

        UsuarioAPI.updatePerfil(id, perfil_id)
        .then(res => {
            callAlert(0, res.message, alertID + 1)
        })
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Perfil de acesso
        		</Typography>
				<form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <TextField
                            variant="outlined"
                            value={nome}
                            fullWidth
                            id="firstName"
                            label="Nome"
                            name="firstName"
                            disabled
                        />
                        <Grid container spacing={0}>
                            <Select
                                variant="outlined"
                                labelId="perfil_id"
                                id="perfil_id"
                                value={perfil_id}
                                fullWidth
                                onChange={handleChangePerfil}>
                                {perfis.map(perfil =>
                                    <MenuItem
                                        key={perfil.id}
                                        value={perfil.id}>
                                        {perfil.id + ' - ' + perfil.descricao}
                                    </MenuItem>
                                )}
                            </Select>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    type="cancel"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleSubmit}
                                >
                                    Atualizar perfil
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
				</form>
			</div>
            <Snackbars mensagem={mensagem} tipo={tipo} id={alertID} />
		</Container>
	);
}