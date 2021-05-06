import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import * as SetorAPI from '../../API/SetorAPI';
import Snackbars from '.././Alert';
import * as CidadeAPI from '../../API/CidadeAPI';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function EditarSetor(props) {
    let { id, descricao, cidade_id } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [mensagem, setMensagem] = React.useState('');
    const [tipo, setTipo] = React.useState(0);
    const [alertID, setAlertID] = React.useState(0);
    const [cidades, setCidades] = React.useState([]);

	useEffect(() => {
		async function getCidades() {
			let response = await CidadeAPI.getAll()
			setCidades(response)
		}

        getCidades();
	}, [])

    const callAlert = (t, m, i) => {
        setTipo(t);
        setMensagem(m);
        setAlertID(i);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const target = event.target;
        target.id === 'descricao' ? descricao = target.value : cidade_id = target.value;
    }

    const handleDelete = () => {
        SetorAPI.deleteById(id)
            .then(res => {
                callAlert(0, res.message, alertID + 1);
                handleClose();
                props.parentCallback();
            });
    }

    const handleUpdate = () => {
        SetorAPI.update(id, {
            descricao: descricao,
            cidade_id: cidade_id
        }).then(res => {
            callAlert(0, res.message, alertID + 1);
            handleClose();
            props.parentCallback();
        }).catch(error => {
            callAlert(1, error.response.message, alertID + 1);
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
                        <TextField id="descricao" label="Descrcao" defaultValue={descricao} onChange={handleChange} />
                        <br />
                        <InputLabel id="cidade_id">Cidade</InputLabel>
                        <Select
                            labelId="cidade_id"
                            id="cidade_id"
                            value={cidade_id}
                            onChange={handleChange}
                            defaultValue='0'>
                            {cidades.map(cidade => 
                                <MenuItem key = {cidade.id} 
                                          value={cidade.id}>
                                    {cidade.nome + '/' + cidade.uf}
                                </MenuItem>    
                            )}
                        </Select>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="secondary">Apagar</Button>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary">Atualizar</Button>
                </DialogActions>
            </Dialog>
            <Snackbars mensagem={mensagem} tipo={tipo} id={alertID} />
        </div>
    );
}