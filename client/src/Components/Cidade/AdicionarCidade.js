import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import * as CidadeAPI from '../../API/CidadeAPI';
import Snackbars from '../Alert';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function AdicionarCidade(props) {
    const [open, setOpen] = React.useState(false);
    const [cidade, setCidade] = React.useState('');
    const [uf, setUF] = React.useState('');
    const [mensagem, setMensagem] = React.useState('');
    const [tipo, setTipo] = React.useState(0);
    const [alertID, setalertID] = React.useState(0);

    const callAlert = (t, m, i) => {
        setTipo(t);
        setMensagem(m);
        setalertID(i);
    }

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.parentCallback();
    };

    const handleChange = (event) => {
        const target = event.target;
        target.id === 'cidade' ? setCidade(target.value) : setUF(target.value);
    }

    const handleSubmit = () => {
        CidadeAPI.add({
            nome: cidade,
            uf: uf
        }).then(res => {
            callAlert(0, res.message, alertID + 1);
            handleClose();
        }).catch(error => {
            callAlert(1, error.response.message, alertID + 1);
        });
    };

    return (
        <div>
			<Tooltip title="Adicionar serviço" aria-label="Adicionar cidade" onClick={handleClickOpen}>
				<Fab color="secondary">
					<AddIcon />
				</Fab>
			</Tooltip>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editar</DialogTitle>
                <DialogContent>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="cidade" label="Cidade" onChange={handleChange} />
                        <br />
                        <TextField id="uf" label="UF" onChange={handleChange} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancelar</Button>
                    <Button onClick={handleSubmit} color="primary">Adicionar</Button>
                </DialogActions>
            </Dialog>
            <Snackbars mensagem={mensagem} tipo={tipo} id={alertID} />
        </div>
    );
}