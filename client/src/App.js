import React, { useState } from 'react';
import { Route } from "react-router-dom";
import Home from './Pages/Home';
import Cidade from './Pages/Cidade';
import Funcionario from './Pages/Funcionario';
import Historico from './Pages/Historico';
import Servico from './Pages/Servico';
import Setor from './Pages/Setor';
import Acessar from './Pages/Acessar'
import Cadastrar from './Pages/Cadastrar'
import SidebarMenu from './Components/SidebarMenu';
import AuthContext from './Context/Auth';

export default function App() {
    const[nome, setNome] = useState('')
    const[email, setEmail] = useState('')
	const[idCliente, setIdCliente] = useState('')
	const[perfil, setPerfil] = useState(0)

	return (
		<div className="app">
			<AuthContext.Provider value={{ nome, setNome, email, setEmail, idCliente, setIdCliente, perfil, setPerfil }}>
				<Route exact path='/' render={() => (
					<SidebarMenu page={<Home />} />
				)} />
				<Route exact path='/cidade' render={() => (
					<SidebarMenu page={<Cidade />} />
				)} />
				<Route exact path='/funcionario' render={() => (
					<SidebarMenu page={<Funcionario />} />
				)} />
				<Route exact path='/historico' render={() => (
					<SidebarMenu page={<Historico />} />
				)} />
				<Route exact path='/servico' render={() => (
					<SidebarMenu page={<Servico />} />
				)} />
				<Route exact path='/setor' render={() => (
					<SidebarMenu page={<Setor />} />
				)} />
				<Route exact path='/acessar' render={() => (
					<SidebarMenu page={<Acessar />} />
				)} />
				<Route exact path='/cadastrar' render={() => (
					<SidebarMenu page={<Cadastrar />} />
				)} />
			</AuthContext.Provider>
		</div>
	)
}