import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import * as CidadeAPI from '../API/CidadeAPI';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function EditarCidade(props) {
    let { id, nome, uf } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const target = event.target;
        target.id === 'cidade' ? nome = target.value : uf = target.value;
    }

    const handleDelete = () => {
        CidadeAPI.deleteById(id)
        .then(() => {
            setOpen(false);
            props.parentCallback();
        });
    }

    const handleUpdate = () => {
        CidadeAPI.update(id, {
            nome: nome,
            uf: uf
        }).then(() => {
            setOpen(false);
            props.parentCallback();
        });
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>Editar</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editar</DialogTitle>
                <DialogContent>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="id" label="Código" defaultValue={id} InputProps={{ readOnly: true, }} />
                        <br />
                        <TextField id="cidade" label="Cidade" defaultValue={nome} onChange={handleChange}/>
                        <br />
                        <TextField id="uf" label="UF" defaultValue={uf} onChange={handleChange}/>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="secondary">Apagar</Button>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary">Atualizar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}