import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as usuarioAPI from '../API/UsuarioAPI';
import Snackbars from '../Components/Alert';
import AuthContext from '../Context/Auth';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Eh-Service
      		</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

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
		width: '100%', // Fix IE 11 issue.
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

export default function Cadastrar() {
	const classes = useStyles();
	const [email, setEmail] = React.useState("");
	const [primeiroNome, setPrimeiroNome] = React.useState("");
	const [sobrenome, setSobrenome] = React.useState("");
	const [senha, setSenha] = React.useState("");
	const [telefone, setTelefone] = React.useState("");
	const authContext = useContext(AuthContext);
	const history = useHistory();

    const [mensagem, setMensagem] = React.useState('');
    const [tipo, setTipo] = React.useState(0);
    const [alertID, setalertID] = React.useState(0);

    const callAlert = (t, m, i) => {
        setTipo(t);
        setMensagem(m);
        setalertID(i);
    }

	const handleSubmit = (event) => {
		event.preventDefault();
		const nome = primeiroNome + ' ' + sobrenome;

		usuarioAPI.add({
			email,
			nome,
			senha,
			telefone
		}).then(res => {
			authContext.setEmail(res.email);
			authContext.setNome(res.nome);
			authContext.setIdCliente(res.id);
			authContext.setPerfil(res.perfil);
            callAlert(0, res.message, alertID + 1);
			history.push('/')
        }).catch(error => {
			console.log(error);
            callAlert(1, 'Erro ao cadastrar cliente.', alertID + 1);
        });
	}

	const handleChangeEmail = (event) => {
		const target = event.target;
		setEmail(target.value);
		console.log("email: " + email);
	}

	const handleChangePrimeiroNome = (event) => {
		const target = event.target;
		setPrimeiroNome(target.value);
	}

	const handleChangeSobrenome = (event) => {
		const target = event.target;
		setSobrenome(target.value);
	}

	const handleChangeSenha = (event) => {
		const target = event.target;
		setSenha(target.value);
	}

	const handleChangeTelefone = (event) => {
		const target = event.target;
		setTelefone(target.value);
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Cadastro
        		</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="Nome"
								autoFocus
								onChange={handleChangePrimeiroNome}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Sobrenome"
								name="lastName"
								autoComplete="lname"
								onChange={handleChangeSobrenome}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email"
								name="email"
								autoComplete="email"
								onChange={handleChangeEmail}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Senha"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChangeSenha}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								fullWidth
								name="phoneNumber"
								label="Telefone"
								type="phoneNumber"
								id="phoneNumber"
								autoComplete="phoneNumber"
								onChange={handleChangeTelefone}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Cadastrar
          			</Button>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
			<Snackbars mensagem={mensagem} tipo={tipo} id={alertID} />
		</Container>
	);
}