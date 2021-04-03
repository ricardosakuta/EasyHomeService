import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import * as SetorAPI from '../../API/SetorAPI';
import Snackbars from '../Alert';
import * as CidadeAPI from '../../API/CidadeAPI';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            minWidth: 120,
        },
    },
}));

export default function AdicionarCidade(props) {
    const [open, setOpen] = React.useState(false);
    const [descricao, setDescricao] = React.useState('');
    const [cidade_id, setCidadeID] = React.useState('');
    const [cidades, setCidades] = React.useState([]);
    const [mensagem, setMensagem] = React.useState('');
    const [tipo, setTipo] = React.useState(0);
    const [alertID, setalertID] = React.useState(0);

    const callAlert = (t, m, i) => {
        setTipo(t);
        setMensagem(m);
        setalertID(i);
    }

	useEffect(() => {
		async function getCidades() {
			let response = await CidadeAPI.getAll()
			setCidades(response)
		}

        getCidades();
	}, [])

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
        target.id === 'descricao' ? setDescricao(target.value) : setCidadeID(target.value);
    }

    const handleSubmit = () => {
        SetorAPI.add({
            descricao: descricao,
            cidade_id: cidade_id
        }).then(res => {
            callAlert(0, res.message, alertID + 1);
            handleClose();
        }).catch(error => {
            callAlert(1, error.response.message, alertID + 1);
        });
    };

    return (
        <div>
            <IconButton color="secondary" aria-label="Adicionar setor" onClick={handleClickOpen}>
                <AddCircle />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editar</DialogTitle>
                <DialogContent>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="descricao" label="Descrição" onChange={handleChange} />
                        <br />
                        <InputLabel id="cidade_id">Código da cidade</InputLabel>
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
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Adicionar</Button>
                </DialogActions>
            </Dialog>
            <Snackbars mensagem={mensagem} tipo={tipo} id={alertID} />
        </div>
    );
}