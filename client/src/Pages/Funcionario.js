import React from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as UsuarioAPI from '../API/UsuarioAPI';

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

export default function Funcionario() {
	const classes = useStyles();
	const [email, setEmail] = React.useState("");
	const history = useHistory();

	const handleGetUsuario = (event) => {
		event.preventDefault();
		UsuarioAPI.getByEmail(email)
			.then(res => {
				console.log("res: " + res)
				history.push({
					pathname: '/perfil',
					state: { res }
				  })
			})
	}

	const handleChangeEmail = (event) => {
		const target = event.target;
		setEmail(target.value);
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
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="E-mail"
								name="email"
								autoComplete="email"
								onChange={handleChangeEmail}
							/>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleGetUsuario}
						>
							pesquisar
						</Button>
					</Grid>
				</form>
			</div>
		</Container>
	);
}