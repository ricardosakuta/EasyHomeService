import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditarCidade from './EditarCidade';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function CartaoCidade(props) {
	const classes = useStyles();

	return (
		<Card className={classes.root} variant="outlined" key={ props.id }>
			<CardContent>
				<Typography variant="h5" component="h1">
					{ props.id } - { props.nome }
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{ props.uf }
				</Typography>
			</CardContent>
			<CardActions>
				<EditarCidade id={props.id}
											nome={props.nome}
											uf={props.uf}/>
			</CardActions>
		</Card>
	);
}