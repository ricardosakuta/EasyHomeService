import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import List from '@material-ui/icons/List';
import LocationCity from '@material-ui/icons/LocationCity';
import Build from '@material-ui/icons/Build';
import Work from '@material-ui/icons/Work';
import Graphic from '@material-ui/icons/BarChart';
import AccountBox from '@material-ui/icons/AccountBox';
import useStyles from '.././Style/MenuUseStyles';
import AuthContext from '../Context/Auth';

export default function SidebarMenuItems() {
    const classes = useStyles();
    const history = useHistory();
    const authContext = useContext(AuthContext);


    return (
        <div>
        <Divider />
            <ListItem button onClick={() => history.push('/')}>
            <ListItemIcon>
                <Home />
            </ListItemIcon>
            <ListItemText disableTypography className={classes.SideBarFont} primary="Home" />
            </ListItem >
            {
                authContext.perfil === 2 ? (
                    <div>
                    <ListItem button onClick={() => history.push('servico')}>
                    <ListItemIcon>
                        <Build />
                    </ListItemIcon>
                    <ListItemText disableTypography className={classes.SideBarFont} primary="Serviço" />
                    </ListItem >

                    <ListItem button onClick={() => history.push('historico')}>
                    <ListItemIcon>
                        <List />            
                    </ListItemIcon>
                    <ListItemText disableTypography className={classes.SideBarFont} primary="Histórico" />
                    </ListItem >
                    </div>
                ) : (
                    null
                )   
            }

            {
                authContext.perfil === 1 ? (
                    <div>
                    <Divider />

                    <ListItem button onClick={() => history.push('cidade')}>
                    <ListItemIcon>
                        <LocationCity />
                    </ListItemIcon>
                    <ListItemText disableTypography className={classes.SideBarFont} primary="Cidade" />
                    </ListItem >

                    <ListItem button onClick={() => history.push('setor')}>
                    <ListItemIcon>
                        <Work />
                    </ListItemIcon>
                    <ListItemText disableTypography className={classes.SideBarFont} primary="Setor de atividade" />
                    </ListItem >

                    <ListItem button onClick={() => history.push('relatorio')}>
                    <ListItemIcon>
                        <Graphic />
                    </ListItemIcon>
                    <ListItemText disableTypography className={classes.SideBarFont} primary="Relatório" />
                    </ListItem >
                    </div>
                ) : (
                    null
                )   
            }

            {
                authContext.perfil === 0 ? (
                    <div>                    
                    <Divider />

                    <ListItem button onClick={() => history.push('funcionario')}>
                    <ListItemIcon>
                        <AccountBox />
                    </ListItemIcon>
                    <ListItemText disableTypography className={classes.SideBarFont} primary="Perfil" />
                    </ListItem >
                    </div>
                ) : (
                    null
                )   
            }
        </div>
    );
}