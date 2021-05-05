import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Empresa from '../Components/Servico/Empresa'
import TextField from '@material-ui/core/TextField';
import * as ServicoAPI from '../API/ServicoAPI';
import Snackbars from '../Components/Alert';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	input: {
		display: 'none',
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
		maxWidth: 345,
	},
	cardContent: {
		flexGrow: 1,
	},
	fab: {
		margin: theme.spacing(2),
	},
	absolute: {
		margin: theme.spacing(3),
		position: 'fixed',
		bottom: '0px',
		right: '0px',
	},
	paper: {
		marginBottom: theme.spacing(3),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default function Servico() {
	const classes = useStyles();
	const [cards, setCards] = React.useState([]);
	const [idEmpresa, setIdEmpresa] = React.useState(0);
	const defatulURL = 'https://designshack.net/wp-content/uploads/placeholder-image-368x246.png'
	const [mensagem, setMensagem] = React.useState('');
	const [tipo, setTipo] = React.useState(0);
	const [alertID, setalertID] = React.useState(0);

	const callAlert = (t, m, i) => {
		setTipo(t);
		setMensagem(m);
		setalertID(i);
	}

	useEffect(() => {
		async function getServicos() {
			let response = await ServicoAPI.getAll(idEmpresa)
			setCards(response);
		}

		if (idEmpresa > 0) {
			getServicos();
		}
	}, [idEmpresa])

	const getCardId = () => {
		let seq = Math.max(...cards.map(o => o.seq)) + 1
		return seq;
	}

	const handleAddServico = () => {
		let CardSeq = 1;

		if (cards.length > 0)
			CardSeq = getCardId()

		console.log("CardId: " + CardSeq);

		setCards([...cards, {
			seq: CardSeq,
			nome: '',
			descricao: '',
			imagem_url: defatulURL,
			valor: 0,
			imagem: '',
			status: 'new'
		}]);
	}

	const handleFileChange = event => {
		let newCards = [...cards];
		let id = parseInt(event.currentTarget.id.replace(/[^\d.]/g, ''));
		newCards[id].selectedFile = event.target.files[0];
		newCards[id].selectedFileURL = URL.createObjectURL(cards[id].selectedFile);
		setCards(newCards);
	};

	const handleFileUpload = e => {
		const id = e.currentTarget.id;
		const formData = new FormData();

		if (!id) {
			console.log("Erro")
			return;
		}

		formData.append("empresa_id", idEmpresa);

		formData.append("seq", cards[id].seq);

		formData.append("nome", cards[id].nome);

		formData.append("descricao", cards[id].descricao);

		formData.append("valor", cards[id].valor);

		if (cards[id].status === 'new') {
			formData.append("upload", cards[id].selectedFile);
			formData.append("extensao", cards[id].selectedFile.name.split('.').pop());

			ServicoAPI.add(formData)
			.then(res => {
				callAlert(0, res.message, alertID + 1);
			}).catch(error => {
				console.log(error);
				callAlert(1, error.response.message, alertID + 1);
			});
		} else {
			if (cards[id].selectedFile) {
				formData.append("upload", cards[id].selectedFile);
				formData.append("extensao", cards[id].selectedFile.name.split('.').pop());
			}

			ServicoAPI.update(idEmpresa, cards[id].seq, formData)
			.then(res => {
				callAlert(0, res.message, alertID + 1);
			}).catch(error => {
				console.log(error);
				callAlert(1, error.response.message, alertID + 1);
			});
		}
	};

	const handleChangeNome = (event) => {
		const target = event.target;
		const id = parseInt(event.currentTarget.id.replace(/[^\d.]/g, ''));
		let newCards = [...cards];

		if (!newCards[id])
			return;

		newCards[id].nome = target.value;
		setCards(newCards);
	}

	const handleChangeDescricao = (event) => {
		const target = event.target;
		const id = parseInt(event.currentTarget.id.replace(/[^\d.]/g, ''));
		let newCards = [...cards];

		if (!newCards[id])
			return;

		newCards[id].descricao = target.value;
		setCards(newCards);
	}

	const handleChangeValor = (event) => {
		const target = event.target;
		const id = parseInt(event.currentTarget.id.replace(/[^\d.]/g, ''));
		let newCards = [...cards];

		if (!newCards[id]) {
			console.log("Erro ao cadastrar o valor")
			return;
		}

		newCards[id].valor = target.value;
		console.log("newCards[id].valor: " + newCards[id].valor)
		setCards(newCards);
	}

	const updateValues = (empresa) => {
		setIdEmpresa(empresa);
	}

	const deleteCard = (event) => {
		const id = event.currentTarget.id;

		ServicoAPI.deleteById(idEmpresa, cards[id].seq)
			.then(res => {
				let newCards = [...cards];
				newCards.splice(id, 1)
				setCards(newCards);

				callAlert(0, res.message, alertID + 1);
			}).catch(error => {
				console.log(error);
				callAlert(1, error.response.message, alertID + 1);
			});
	}

	return (
		<div>
			<div className={classes.heroContent}>
				<Empresa parentCallback={updateValues} />
				<Container className={classes.cardGrid} maxWidth="md">
					{cards.length > 0 ? (
						<Typography component="h1" variant="h5" className={classes.paper}>
							Serviços
						</Typography>
					) : (
						<Typography component="h1" variant="h5" className={classes.paper}>
							Nenhum serviço cadastrado!
						</Typography>
					)}
					<Grid container spacing={4}>
						{cards.map((card, index) => (
							<Grid item key={card.id} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<div>
										<CardMedia
											className={classes.cardMedia}
											image={card.selectedFileURL ? card.selectedFileURL : card.imagem_url}
											title={card.nome}
											id={index} />

										<input
											type="file"
											id={"Input" + index}
											onChange={handleFileChange}
											accept=".jpeg, .jpg"
										/>
									</div>

									<CardContent className={classes.cardContent}>
										<Grid container spacing={2}>
											<Grid item xs={12}>
												<TextField
													variant="outlined"
													fullWidth
													name="Nome"
													label="Nome"
													type="Nome"
													id={"Nome" + index}
													defaultValue={card.nome}
													autoComplete="Nome"
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
													id={"Descricao" + index}
													autoComplete="Descricao"
													defaultValue={card.descricao}
													multiline
													rows={4}
													onChange={handleChangeDescricao}
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													variant="outlined"
													fullWidth
													name="Valor"
													label="Valor"
													type="Valor"
													id={"Valor" + index}
													autoComplete="Valor"
													defaultValue={card.valor}
													onChange={handleChangeValor}
												/>
											</Grid>
										</Grid>
									</CardContent>
									<CardActions>
										<Button size="small" color="primary" id={index} onClick={handleFileUpload}>
											Salvar
                    					</Button>
										<Button size="small" color="secondary" id={index} onClick={deleteCard}>
											Apagar
                    					</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</div>

			<Tooltip title="Adicionar serviço" aria-label="add" onClick={handleAddServico}>
				<Fab color="secondary" className={classes.absolute}>
					<AddIcon />
				</Fab>
			</Tooltip>
			<Snackbars mensagem={mensagem} tipo={tipo} id={alertID} />
		</div>
	);
}