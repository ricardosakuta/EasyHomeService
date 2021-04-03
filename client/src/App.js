import React from 'react';
import { Route } from "react-router-dom";
import Buscar from './Pages/Buscar';
import Cidade from './Pages/Cidade';
import Funcionario from './Pages/Funcionario';
import Historico from './Pages/Historico';
import Servico from './Pages/Servico';
import Setor from './Pages/Setor';
import SidebarMenu from './Components/SidebarMenu';

export default function App() {
	return (
		<div className="app">
			<Route exact path='/' render={() => (
				<SidebarMenu page={<Buscar />} />
			)} />
			<Route exact path='/buscar' render={() => (
				<SidebarMenu page={<Buscar />} />
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
		</div>
	)
}