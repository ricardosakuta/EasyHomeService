import React, { useEffect, useState } from 'react';
import * as CidadeAPI from '../API/CidadeAPI';
import CartaoCidade from '../Components/CartaoCidade';
import AddCircle from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';


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

export default function Cidade() {
    const classes = useStyles();
    const [cidades, setCidades] = useState([]);

    useEffect(() => {
        async function fetchMyAPI() {
          let response = await CidadeAPI.getAll()
          setCidades(response)
        }

        fetchMyAPI();
      }, [])

    return (
        <div>
          <h1>Cidades:</h1>
            {cidades.map(cidade => <CartaoCidade key={ cidade.id }
                                                 id={ cidade.id }
                                                 nome={ cidade.nome }
                                                 uf={ cidade.uf }/>)}
          <div className={classes.root}>
            <IconButton color="secondary" aria-label="add an alarm">
              <AddCircle />
            </IconButton>
          </div>
        </div>
    )
}