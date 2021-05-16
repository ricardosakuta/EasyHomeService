import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as CidadeAPI from '../API/CidadeAPI';
import * as ServicoAPI from '../API/ServicoAPI';
import * as CurtidaAPI from '../API/CurtidaAPI';
import AuthContext from '../Context/Auth';

const useStyles = makeStyles((theme) => ({
	root: {
        margin: theme.spacing(1),
        maxWidth: 600,
        textAlign: 'left',
        verticalAlign: 'middle',
        display: 'inline-block',
        width: '100%'
	},
	media: {
		paddingTop: '56.25%', // 16:9
		width: '100%',
	},
	avatar: {
		backgroundColor: red[500],
	},
	margin: {
		paddingBottom: '25px',
		textAlign: 'center'
	},
	cidade: {
		textAlign: 'center'
	},
    center: {
        textAlign: 'center',
        verticalAlign: 'middle',
        display: 'inline-block',
        width: '100%'
    },
}));

export default function Home() {
	const classes = useStyles();
	const [cards, setCards] = useState([]);
	const [cidades, setCidades] = React.useState([]);
	const [cidade_id, setCidadeId] = React.useState(-1);
	const authContext = useContext(AuthContext);
	let timer;

	async function getServicosByCidade(clienteId, cidadeId) {
		let response = await ServicoAPI.getByCidade(clienteId, cidadeId)
		setCards(response);
	}

	async function getServicosByCurtida(clienteId) {
		let response = await CurtidaAPI.getByCurtida(clienteId)
		setCards(response);
	}

	useEffect(() => {
		if (cidade_id > 0) {
			getServicosByCidade(authContext.idCliente, cidade_id);
		} else {
			getServicosByCurtida(authContext.idCliente);
		}
	}, [cidade_id, authContext.idCliente])

	useEffect(() => {
		async function getCidades() {
			let response = await CidadeAPI.getAll()
			setCidades(response)
		}

		async function getServicos() {
			setCards([])
		}

		getServicos();
		getCidades();
	}, [])

	const handleChangeCidade = (event) => {
		const target = event.target;
		setCidadeId(target.value);
	}

	const handleBuscar = (event) => {
		async function getServicosByCidade(texto) {
			let response = await ServicoAPI.getByTexto(authContext.idCliente, texto)
			setCards(response);
		}

		const target = event.target;

		clearTimeout(timer);

		timer = setTimeout(() => {
			if (target.value !== "")
				getServicosByCidade(target.value)
			else if (cidade_id > 0) {
				getServicosByCidade(authContext.idCliente, cidade_id);
			} else {
				getServicosByCurtida(authContext.idCliente);
			}
		}, 1000);
	}

	const handleCurtir = (event) => {
		
		if (authContext.idCliente > 0) {
			let newCards = [...cards];
			let id = event.currentTarget.id

			console.log(newCards[id].curtiu);
			if (parseInt(newCards[id].curtiu) === 1) {
				CurtidaAPI.deleteById(cards[id].empresa_id, cards[id].seq, authContext.idCliente);
				newCards[id].curtiu = 0;
			} else {
				CurtidaAPI.add({
					empresa_id: cards[id].empresa_id,
					seq: cards[id].seq,
					cliente_id: authContext.idCliente
				});
				newCards[id].curtiu = 1;
			}

			setCards(newCards);
			console.log(cards)
		}
	}

	return (
		<div className={classes.center}>
			<Select
				fullWidth
				className={classes.cidade}
				variant="outlined"
				labelId="cidade_id"
				id="cidade_id"
				value={cidade_id}
				onChange={handleChangeCidade}>
				{cidades.map(cidade =>
					<MenuItem key={cidade.id}
						value={cidade.id}>
						{cidade.nome + '/' + cidade.uf}
					</MenuItem>
				)}
			</Select>
			<FormControl fullWidth className={classes.margin} variant="filled">
				<InputLabel>Buscar</InputLabel>
				<FilledInput id="buscar" onChange={handleBuscar} />
			</FormControl>

			{cards.map((card, index) => (
				<Card className={classes.root} key={card.empresa_id + card.seq}>

					<CardHeader
						avatar={
							<Avatar aria-label="recipe" className={classes.avatar}>
								{card.nome_empresa.charAt(0)}
					  			</Avatar>
						}
						title={card.nome_empresa + ' ' + card.nome}
						subheader={"Contato: " + card.telefone}
					/>
					<CardMedia
						className={classes.media}
						image={card.imagem_url}
						title="Paella dish"
					/>
					<CardContent>
						<Typography variant="body2" color="textSecondary" component="p">
							{cidades.find(e => e.id === card.cidade_id) ? (
								cidades.find(e => e.id === card.cidade_id).nome
							):(
								console.log(cidades)
							)}
						</Typography>
					</CardContent>
					<CardContent>
						<Typography variant="body2" color="textSecondary" component="p">
							{card.descricao}
						</Typography>
					</CardContent>
					<CardContent>
						<Typography variant="body2" color="textSecondary" component="p">
							{'R$' + card.valor}
						</Typography>
					</CardContent>
					<CardActions disableSpacing>
						<IconButton
							aria-label="Curtir"
							id={index}
							onClick={handleCurtir}>
								
							{card.curtiu > 0 ? (
								<FavoriteRoundedIcon color="secondary"/>
							) : (
								<FavoriteIcon />
							)}
						</IconButton>
					</CardActions>
				</Card>
			))}
		</div>
	);
}
