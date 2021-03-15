import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Buscar from './Pages/Buscar'
import Historico from './Pages/Historico'
import Cidade from './Pages/Cidade'
import SetorDeAtividade from './Pages/SetorDeAtividade'
import Servico from './Pages/Servico'
import Funcionario from './Pages/Funcionario'

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Search from '@material-ui/icons/Search';
import List from '@material-ui/icons/List';
import LocationCity from '@material-ui/icons/LocationCity';
import Build from '@material-ui/icons/Build';
import Work from '@material-ui/icons/Work';
import AccountBox from '@material-ui/icons/AccountBox';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function SidebarMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [component, setComponent] = React.useState('Buscar')

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Easy Home Service
          </Typography>
          <Button color="inherit">Login</Button>
          <Button  variant="contained" color="secondary">Cadastrar</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>

        <Divider />

        <ListItem button onClick={() => setComponent('Buscar')}>
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <ListItemText disableTypography className={classes.SideBarFont} primary="Buscar" />
        </ListItem >

        <ListItem button onClick={() => setComponent('Historico')}>
          <ListItemIcon>
            <List />
          </ListItemIcon>
          <ListItemText disableTypography className={classes.SideBarFont} primary="Histórico" />
        </ListItem >

        <Divider />
        
        <ListItem button onClick={() => setComponent('Cidade')}>
          <ListItemIcon>
            <LocationCity />
          </ListItemIcon>
          <ListItemText disableTypography className={classes.SideBarFont} primary="Cidade" />
        </ListItem >

        <ListItem button onClick={() => setComponent('SetorDeAtividade')}>
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText disableTypography className={classes.SideBarFont} primary="Setor de atividade" />
        </ListItem >

        <ListItem button onClick={() => setComponent('Servico')}>
          <ListItemIcon>
            <Build />
          </ListItemIcon>
          <ListItemText disableTypography className={classes.SideBarFont} primary="Servico" />
        </ListItem >

        <Divider />

        <ListItem button onClick={() => setComponent('Funcionario')}>
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText disableTypography className={classes.SideBarFont} primary="Funcionário" />
        </ListItem >
      </Drawer>
      <main
        className={clsx(classes.content, {[classes.contentShift]: open,})}>
          <div className={classes.drawerHeader} />
          {
            component === 'Buscar' ?
            <Buscar />
            :
            component === 'Historico' ?
            <Historico />
            :
            component === 'Cidade' ?
            <Cidade />
            :
            component === 'SetorDeAtividade' ?
            <SetorDeAtividade />
            :
            component === 'Servico' ?
            <Servico />
            :
            component === 'Funcionario' ?
            <Funcionario />
            :
            <Buscar />
          }
      </main>
    </div>
  );
}