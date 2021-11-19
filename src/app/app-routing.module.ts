import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';
import { ClienteInserirComponent } from './clientes/cliente-inserir/cliente-inserir.component';
import { PacienteListaComponent } from './clientes/paciente-lista/paciente-lista.component';
import { PacienteInserirComponent } from './clientes/paciente-inserir/paciente-inserir.component';
import { Cadastro } from './cadastro/cliente.component';
import { MenuComponent } from './menu/menu.component';
import { AgendaComponent } from './agenda/agenda.component';
import{InicioComponent} from './inicio/inicio.component'
const routes: Routes = [

{ path: 'login', component: Cadastro },
{path:'inicio',component:InicioComponent},
{ path: 'criar', component: ClienteInserirComponent},
{ path: 'lista', component: ClienteListaComponent },
{ path: 'criarPaciente', component: PacienteInserirComponent},
{ path: 'pacientelista', component: PacienteListaComponent },
{ path: 'editar/:idCliente', component: ClienteInserirComponent},
{ path: 'editarPaciente/:idPaciente', component: PacienteInserirComponent},
{ path:'menu', component: MenuComponent},
{ path: 'agendar', component: AgendaComponent }


];
@NgModule({
imports: [
RouterModule.forRoot(routes)
],
exports: [
RouterModule
]
})
export class AppRoutingModule{
}