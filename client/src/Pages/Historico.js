import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import * as CidadeAPI from '../API/CidadeAPI';
import * as CurtidaAPI from '../API/CurtidaAPI';
import * as ComentarioAPI from '../API/ComentarioAPI';
import AuthContext from '../Context/Auth';
import Container from '@material-ui/core/Container';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    center: {
        textAlign: 'center',
        verticalAlign: 'middle',
        display: 'inline-block',
        width: '100%'
    },
    btn: {
        margin: theme.spacing(1),
    },
}));

export default function Histórico() {
    const classes = useStyles();
    const [cards, setCards] = useState([]);
    const [cidades, setCidades] = React.useState([]);
    const authContext = useContext(AuthContext);
    const [expanded, setExpanded] = React.useState(false);
    const [comentario, setComentario] = React.useState("");

    async function getServicosByCurtida(clienteId) {
        let response = await CurtidaAPI.getByCliente(clienteId)
        setCards(response);
    }

    async function getComentarios(id) {
        let newCards = [...cards];
        let response = await ComentarioAPI.getAll(newCards[id].empresa_id, newCards[id].seq);
        newCards[id].comentarios = response;
        setCards([...newCards]);
    }

    useEffect(() => {
        getServicosByCurtida(authContext.idCliente);
    }, [authContext.idCliente])

    useEffect(() => {
        async function getCidades() {
            let response = await CidadeAPI.getAll()
            setCidades(response)
        }

        getCidades();
    }, [])

    const handleExpandClick = (event) => {
        setExpanded(!expanded);

        if (expanded)
            return;

        let id = event.currentTarget.id
        getComentarios(id);
    };

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

    const handleChangeComentario = (event) => {
        const target = event.target;
        setComentario(target.value);
    }

    const handleEnviarComentario = (event) => {
        let id = event.currentTarget.id;
        let card = cards[id];
        let newCards = [...cards];

        console.log("AuthContext.idcliente: " + authContext.idCliente);

        let newComentario = {
            empresa_id: card.empresa_id,
            seq_servico: card.seq,
            texto: comentario,
            cliente_id: authContext.idCliente,
            nome_cliente: authContext.nome
        };

        ComentarioAPI.add(newComentario);

        newCards[id].comentarios = ([newComentario, ...newCards[id].comentarios]);
        setCards([...newCards]);
        setComentario('');
    }

    return (
        <div className={classes.center}>
            {cards && cards.length > 0 ? (
                cards.map((card, index) => (
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
                                ) : (
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
                                    <FavoriteRoundedIcon color="secondary" />
                                ) : (
                                    <FavoriteIcon />
                                )}
                            </IconButton>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                id={index}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="Comentar"
                                    label="Comentar"
                                    type="Comentar"
                                    id="Comentar"
                                    autoComplete="Comentar"
                                    value={comentario}
                                    multiline
                                    rows={3}
                                    onChange={handleChangeComentario}
                                />
                                <Button size="small" className={classes.btn} id={index} onClick={handleEnviarComentario}>
                                    Enviar
                                </Button>
                                {
                                    card.comentarios && card.comentarios.length > 0 ? (
                                        card.comentarios.map((e) => (
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                                        {e.nome_cliente.charAt(0)}
                                                    </Avatar>
                                                }
                                                title={e.nome_cliente}
                                                subheader={e.texto}
                                            />
                                        ))
                                    ) : (
                                        <Typography paragraph>Nenhum comentário foi feito.</Typography>
                                    )
                                }
                            </CardContent>
                        </Collapse>
                    </Card>
                ))
            ) : (
                <Container className={classes.cardGrid} maxWidth="md">
                    <Typography variant="body2" color="textSecondary" component="p">
                        Não foi encontrado nenhum histórico de curtidas!
                    </Typography>
                </Container>
            )}


        </div>
    );
}