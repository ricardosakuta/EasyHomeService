import React, { useState, useEffect } from 'react';
import { Route } from "react-router-dom";
import Home from './Pages/Home';
import Cidade from './Pages/Cidade';
import Funcionario from './Pages/Funcionario';
import Historico from './Pages/Historico';
import Servico from './Pages/Servico';
import Setor from './Pages/Setor';
import Acessar from './Pages/Acessar'
import Cadastrar from './Pages/Cadastrar'
import Perfil from './Pages/Perfil'
import Relatorio from './Pages/Relatorio'
import SidebarMenu from './Components/SidebarMenu';
import AuthContext from './Context/Auth';

export default function App() {
    const[nome, setNome] = useState('')
    const[email, setEmail] = useState('')
	const[idCliente, setIdCliente] = useState(0)
	const[perfil, setPerfil] = useState(-1)

	useEffect(() => {
		if (localStorage.hasOwnProperty("nome")) {
			setNome(localStorage.getItem("nome"))
		}
		if (localStorage.hasOwnProperty("email")) {
			setEmail(localStorage.getItem("email"))
		}
		if (localStorage.hasOwnProperty("idCliente")) {
			setIdCliente(Number(localStorage.getItem("idCliente")))
		}
		if (localStorage.hasOwnProperty("perfil")) {
			setPerfil(Number(localStorage.getItem("perfil")))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem("nome", nome)
	}, [nome])

	useEffect(() => {
		localStorage.setItem("email", email)
	}, [email])

	useEffect(() => {
		localStorage.setItem("idCliente", idCliente)
	}, [idCliente])

	useEffect(() => {
		localStorage.setItem("perfil", perfil)
	}, [perfil])

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
				<Route exact path='/perfil' render={() => (
					<SidebarMenu page={<Perfil />} />
				)} />
				<Route exact path='/relatorio' render={() => (
					<SidebarMenu page={<Relatorio />} />
				)} />
			</AuthContext.Provider>
		</div>
	)
}