import { Component, OnInit, OnDestroy } from '@angular/core';
import { Paciente } from '../paciente.model';
import { PacienteService } from '../paciente.service';

import { Subscription, Observable } from 'rxjs';
@Component({
selector: 'app-paciente-lista',
templateUrl: './paciente-lista.component.html',
styleUrls: ['./paciente-lista.component.css'],
})
export class PacienteListaComponent implements OnInit, OnDestroy {
pacientes: Paciente[] = [];
pacientesSubscription: Subscription = new Subscription;
public estaCarregando=false;

constructor(public pacienteService: PacienteService) {}


  ngOnInit(): void {
    this.estaCarregando=true;
    this.pacienteService.getPacientes();
    this.pacientesSubscription = this.pacienteService
.getListaDePacientesAtualizadaObservable()
.subscribe((pacientes: Paciente[]) => {
  this.estaCarregando=false;
this.pacientes = pacientes;
});
  }

  onDeletePaciente (id: string): void{
    this.pacienteService.removerPaciente(id);
    }

  ngOnDestroy(): void {
    this.pacientesSubscription.unsubscribe();
    }
}