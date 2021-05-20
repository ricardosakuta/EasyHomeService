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
import AuthContext from '../Context/Auth';
import GoogleLogin from 'react-google-login';
import * as AuthAPI from '../API/AuthAPI';
import Snackbars from '../Components/Alert';
import * as usuarioAPI from '../API/UsuarioAPI';

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
		marginTop: theme.spacing(1),
	},
	submit: {
		width: '100%',
		margin: theme.spacing(3, 0, 2),
	},
	google: {
		width: '100%',
		margin: theme.spacing(3, 0, 2),
	}
}));

export default function Acessar() {
	const classes = useStyles();
	const authContext = useContext(AuthContext);
	const history = useHistory();
	const [email, setEmail] = React.useState("");
	const [senha, setSenha] = React.useState("");

	const [mensagem, setMensagem] = React.useState('');
	const [tipo, setTipo] = React.useState(0);
	const [alertID, setalertID] = React.useState(0);

	const callAlert = (t, m, i) => {
		setTipo(t);
		setMensagem(m);
		setalertID(i);
	}

	const handleChangeEmail = (event) => {
		const target = event.target
		setEmail(target.value)
	}

	const handleChangeSenha = (event) => {
		const target = event.target
		setSenha(target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		usuarioAPI.login({
			email,
			senha
		}).then(res => {
			
			if (res.email) {
				callAlert(0, res.message, alertID + 1);
				authContext.setEmail(res.email);
				authContext.setNome(res.nome);
				authContext.setIdCliente(res.id);
				authContext.setPerfil(res.perfil);
				history.push('/')
			} else {
				callAlert(1, res.message, alertID + 1);
			}
		}).catch(error => {
			callAlert(1, 'Não foi possível efetuar o login.', alertID + 1);
		});
	}

	const responseGoogleSucess = (res) => {
		console.log(res);

		AuthAPI.add(res)
			.then(res => {
				authContext.setEmail(res.email);
				authContext.setNome(res.name);
				authContext.setIdCliente(res.id);
				authContext.setPerfil(res.perfil)
				callAlert(0, res.message, alertID + 1);
				history.push('/')
			}).catch(error => {
				callAlert(1, 'Erro genérico.', alertID + 1);
			});
	}

	const responseGoogleFailure = (res) => {
		console.log('responseGoogleFailure');
		console.log(res);
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Acessar
        		</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="E-mail"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={handleChangeEmail}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Senha"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChangeSenha}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Entrar
          			</Button>
					<Grid container>
						<Grid item>
							<Link href="/cadastrar" variant="body2">
								{"Não tem conta? Crie uma aqui."}
							</Link>
						</Grid>
					</Grid>
					<GoogleLogin
						clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
						buttonText="Acessar com conta Google"
						onSuccess={responseGoogleSucess}
						onFailure={responseGoogleFailure}
						cookiePolicy={'single_host_origin'}
						className={classes.google}
					/>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
			<Snackbars mensagem={mensagem} tipo={tipo} id={alertID} />
		</Container>
	);
}