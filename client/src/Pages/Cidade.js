import React, { useEffect, useState, useContext } from 'react';
import * as CidadeAPI from '../API/CidadeAPI';
import { makeStyles } from '@material-ui/core/styles';
import CartaoCidade from '../Components/Cidade/CartaoCidade';
import AdicionarCidade from '../Components/Cidade/AdicionarCidade';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import Typography from '@material-ui/core/Typography';
import AuthContext from '../Context/Auth';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	root: {
		'& > *': {
			margin: theme.spacing(3),
			position: 'fixed',
			bottom: '0px',
			right: '0px',
		},
	},
	button: {
		'& > *': {
			margin: theme.spacing(3),
			position: 'fixed',
			bottom: '0px',
			left: '0px',
		},
	}
}));

export default function Cidade() {
	const classes = useStyles();
	const [cidades, setCidades] = useState([]);
	const [update, setUdate] = useState(true);
	const authContext = useContext(AuthContext);

	useEffect(() => {
		async function getCidades() {
			let response = await CidadeAPI.getAll()
			setCidades(response)
		}

		if (update) {
			getCidades();
			setUdate(false)
		}
	}, [update])

	const handleUpdate = () => {
		setUdate(true);
	}

	const handlePDF = (event) => {
		event.preventDefault();

		const doc = new jsPDF();
		var col = [
			"Código da cidade",
			"Nome",
			"UF",
		];
		console.log(cidades);
		let docArray = [
			...cidades.map(e => [
				e.id,
				e.nome,
				e.uf
			])
		]
		doc.autoTable(col, docArray, { startY: 10 });
		doc.save("cidades.pdf");
	}

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
					<div>
						<h1>Cidade</h1>
						{cidades.map(cidade =>
							<CartaoCidade
								key={cidade.id}
								id={cidade.id}
								nome={cidade.nome}
								uf={cidade.uf}
								parentCallback={handleUpdate} />)}
						<div className={classes.root}>
							<AdicionarCidade parentCallback={handleUpdate} />
						</div>
						<div className={classes.button}>
							<Button
								variant="contained"
								color="primary"
								size="small"
								startIcon={<SaveIcon />}
								onClick={handlePDF}
							>
								Save
 	     					</Button>
						</div>
					</div>
				)
			}
		</div>
	)
}