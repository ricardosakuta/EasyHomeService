import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AuthContext from '../Context/Auth';
import Snackbars from '../Components/Alert';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	paper: {
		marginRight: theme.spacing(2),
	},
}));

export default function MenuListComposition() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const authContext = useContext(AuthContext);
	const history = useHistory();

    const [mensagem, setMensagem] = React.useState('');
    const [tipo, setTipo] = React.useState(0);
    const [alertID, setalertID] = React.useState(0);

    const callAlert = (t, m, i) => {
        setTipo(t);
        setMensagem(m);
        setalertID(i);
    }

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const handleLogout = (event) => {
		authContext.setEmail("");
		authContext.setNome("");
		authContext.setIdCliente(0);
		authContext.setPerfil(-1);

		handleClose(event);
		callAlert(0, "Sessão encerrada com sucesso.", alertID + 1);
		history.push('/')
	}

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<div className={classes.root}>
			<div>
				<Avatar
					ref={anchorRef}
					aria-controls={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
				>
				</Avatar>

				<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
										<MenuItem onClick={handleLogout}>Logout</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
			<Snackbars mensagem={mensagem} tipo={tipo} id={alertID} />
		</div>
	);
}