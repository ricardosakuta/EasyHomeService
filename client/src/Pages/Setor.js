import React, { useEffect, useState } from 'react';
import * as SetorAPI from '../API/SetorAPI';
import { makeStyles } from '@material-ui/core/styles';
import CartaoSetor from '../Components/Setor/CartaoSetor';
import AdicionarSetor from '../Components/Setor/AdicionarSetor';

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

export default function Setor() {
	const classes = useStyles();
	const [setores, setSetores] = useState([]);
	const [update, setUdate] = useState(true);
	
	useEffect(() => {
		async function getCidades() {
			let response = await SetorAPI.getAll()
			setSetores(response)
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
				<AdicionarSetor parentCallback={handleUpdate}/>
			</div>
		</div>
	)
}