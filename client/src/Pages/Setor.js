import React, { useEffect, useState } from 'react';
import * as SetorAPI from '../API/SetorAPI';
import { makeStyles } from '@material-ui/core/styles';
import CartaoSetor from '../Components/Setor/CartaoSetor';
import AdicionarSetor from '../Components/Setor/AdicionarSetor';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

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

export default function Setor() {
	const classes = useStyles();
	const [setores, setSetores] = useState([]);
	const [update, setUdate] = useState(true);

	useEffect(() => {
		async function getCidades() {
			let response = await SetorAPI.getAll()
			setSetores(response)
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
			"Código do setor",
			"Descricao",
			"Cidade",
			"UF",
		];
		let docArray = [
			...setores.map(e => [
				e.id,
				e.descricao,
				e.cidade_nome,
				e.cidade_uf,
			])
		]
		//console.log(col, docArray);
		doc.autoTable(col, docArray, { startY: 10 });
		doc.save("setor.pdf");
	}

	return (
		<div>
			<h1>Setor de atividade</h1>
			{setores.map(setor =>
				<CartaoSetor
					key={setor.id}
					id={setor.id}
					descricao={setor.descricao}
					cidade_id={setor.cidade_id}
					cidade_nome={setor.cidade_nome}
					cidade_uf={setor.cidade_uf}
					parentCallback={handleUpdate} />)}
			<div className={classes.root}>
				<AdicionarSetor parentCallback={handleUpdate} />
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