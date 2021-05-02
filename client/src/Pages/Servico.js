import React, { useEffect } from 'react';
//import axios from 'axios';
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
	const defatulURL = 'https://designshack.net/wp-content/uploads/placeholder-image-368x246.png'

	useEffect(() => {
		setCards([
			{
				id: 1,
				nome: 'Teste01',
				descricao: 'Iunbfa oaregoai awefouinawefjn awefiuna weifuaefiunwaef',
				imagem_url: defatulURL,
				valor: 10,
				selectedFile: null,
				selectedFileURL: null
			},
			{
				id: 2,
				nome: 'Teste02',
				descricao: 'Iunbfa oaregoai awefouinawefjn awefiuna weifuaefiunwaef',
				imagem_url: defatulURL,
				valor: 20,
				selectedFile: null,
				selectedFileURL: null
			},
			{
				id: 3,
				nome: 'Teste03',
				descricao: 'Iunbfa oaregoai awefouinawefjn awefiuna weifuaefiunwaef',
				imagem_url: defatulURL,
				valor: 30,
				selectedFile: null,
				selectedFileURL: null
			},
			{
				id: 4,
				nome: 'Teste04',
				descricao: 'Iunbfa oaregoai awefouinawefjn awefiuna weifuaefiunwaef',
				imagem_url: defatulURL,
				valor: 0,
				selectedFile: null,
				selectedFileURL: null
			}
		]);
	}, []);

	useEffect(() => { }, [cards])

	const handleAddServico = () => {
		setCards([...cards, {
			id: 5,
			nome: '',
			descricao: '',
			imagem_url: 'https://designshack.net/wp-content/uploads/placeholder-image-368x246.png',
			valor: 0
		}]);
	}

	const handleFileChange = event => {
		let newCards = [...cards];
		newCards[event.target.id].selectedFile = event.target.files[0];
		newCards[event.target.id].selectedFileURL = URL.createObjectURL(cards[event.target.id].selectedFile);
		setCards(newCards);
	};

	const handleFileUpload = e => {
		const id = e.currentTarget.id;
		console.log("ID: " + e.currentTarget.id)
		console.log(cards[id].nome);
		// Create an object of formData 
		const formData = new FormData();

		if (!id || !cards[id].selectedFile)
			return;

		// Update the formData object 
		formData.append(
			"myFile",
			cards[id].selectedFile,
			cards[id].selectedFile.name
		);

		// Details of the uploaded file 
		console.log(cards[id].selectedFileURL);
		console.log(cards[id].nome);

		// Request made to the backend api 
		// Send formData object 
		//axios.post("api/uploadfile", formData); 
	};

    const handleChangeNome = (event) => {
        const target = event.target;
		const id = event.currentTarget.key;
		let newCards = [...cards];

		newCards[id].nome = target.value;
		setCards(newCards);
    }

    const handleChangeDescricao = (event) => {
        const target = event.target;
		const id = event.currentTarget.key;
		let newCards = [...cards];
		
		newCards[id].descricao = target.value;
		setCards(newCards);
    }

    const handleChangeValor = (event) => {
        const target = event.target;
		const id = event.currentTarget.key;
		let newCards = [...cards];
		
		newCards[id].valor = target.value;
		setCards(newCards);
    }

	return (
		<div>
			<div className={classes.heroContent}>
				<Empresa />
				<Container className={classes.cardGrid} maxWidth="md">
					<Typography component="h1" variant="h5" className={classes.paper}>
						Serviços
        		    </Typography>
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

										<input type="file" id={index} onChange={handleFileChange} alt='' />
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
													id="Nome"
													key={index}
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
													id="Descricao"
													key={index}
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
													id="Valor"
													key={index}
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
										<Button size="small" color="secondary" id={index}>
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
		</div>
	);
}