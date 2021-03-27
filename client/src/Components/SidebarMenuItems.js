import React from 'react';
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Search from '@material-ui/icons/Search';
import List from '@material-ui/icons/List';
import LocationCity from '@material-ui/icons/LocationCity';
import Build from '@material-ui/icons/Build';
import Work from '@material-ui/icons/Work';
import AccountBox from '@material-ui/icons/AccountBox';
import useStyles from '.././Style/MenuUseStyles';

export default function SidebarMenuItems() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div>
        <Divider />
            <ListItem button onClick={() => history.push('buscar')}>
            <ListItemIcon>
                <Search />
            </ListItemIcon>
            <ListItemText disableTypography className={classes.SideBarFont} primary="Buscar" />
            </ListItem >

            <ListItem button onClick={() => history.push('historico')}>
            <ListItemIcon>
                <List />            
            </ListItemIcon>
            <ListItemText disableTypography className={classes.SideBarFont} primary="Histórico" />
            </ListItem >

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

            <ListItem button onClick={() => history.push('servico')}>
            <ListItemIcon>
                <Build />
            </ListItemIcon>
            <ListItemText disableTypography className={classes.SideBarFont} primary="Servico" />
            </ListItem >

            <Divider />

            <ListItem button onClick={() => history.push('funcionario')}>
            <ListItemIcon>
                <AccountBox />
            </ListItemIcon>
            <ListItemText disableTypography className={classes.SideBarFont} primary="Funcionário" />
            </ListItem >
        </div>
    );
}