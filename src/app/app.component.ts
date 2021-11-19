import { Component } from '@angular/core';
import { Cliente } from './clientes/cliente.model';
import { Paciente } from './clientes/paciente.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clientes: Cliente[] = [];
  pacientes:Paciente[]=[];
 

  onClienteAdicionado(cliente: Cliente) {
  this.clientes.push(cliente);
  }

  onPacienteAdicionado(paciente: Paciente) {
    this.pacientes.push(paciente);
    }
}
