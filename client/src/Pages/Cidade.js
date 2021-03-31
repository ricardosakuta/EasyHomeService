import React, { useEffect, useState } from 'react';
import * as CidadeAPI from '../API/CidadeAPI';
import CartaoCidade from '../Components/CartaoCidade';
import { makeStyles } from '@material-ui/core/styles';
import AdicionarCidade from '../Components/AdicionarCidade';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	root: {
		'& > *': {
			margin: theme.spacing(1),
			position: 'fixed',
			bottom: '0px',
			right: '0px',
		},
	},
}));

export default function Cidade() {
	const classes = useStyles();
	const [cidades, setCidades] = useState([]);
	const [update, setUdate] = useState(true);
	
	useEffect(() => {
		async function getCidades() {
			let response = await CidadeAPI.getAll()
			setCidades(response)
		}

		if (update)	{
			getCidades();
			setUdate(false)
		}
	}, [update])

	const handleUpdate = () => {
		setUdate(true);
	}

	return (
		<div>
			<h1>Cidades:</h1>
			{cidades.map(cidade =>
				<CartaoCidade
					key={cidade.id}
					id={cidade.id}
					nome={cidade.nome}
					uf={cidade.uf}
					parentCallback={handleUpdate} />)}
			<div className={classes.root}>
				<AdicionarCidade parentCallback={handleUpdate}/>
			</div>
		</div>
	)
}