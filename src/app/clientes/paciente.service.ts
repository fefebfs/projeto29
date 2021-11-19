import { Injectable } from '@angular/core';
import { Paciente } from './paciente.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class PacienteService {
    private pacientes: Paciente[] = [];
    private listaPacienteAtualizada = new Subject<Paciente[]>();
    pacienteService: any;

    onDelete(id: string): void {
        this.pacienteService.removerPaciente(id);
    }


    getPacientes(): void {
        this.httpClient
            .get<{ mensagem: string, pacientes: any }>('http://localhost:3000/api/pacientes')
            .pipe(map((dados) => {
                return dados.pacientes.map((paciente: { _id: any; nome: any; fone: any; email: any; senha: any; estado: any; datanasc: any }) => {
                    return {
                        id: paciente._id,
                        nome: paciente.nome,
                        fone: paciente.fone,
                        email: paciente.email,
                        senha: paciente.senha,
                        estado: paciente.estado,
                        datanasc: paciente.datanasc
                    }
                })
            }))
            .subscribe(
                (pacientes) => {
                    this.pacientes = pacientes;
                    this.listaPacienteAtualizada.next([...this.pacientes]);
                }
            )
    }

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    adicionarPaciente(nome: string, fone: string, email: string, senha: string, estado: string, datanasc: string, imagem: File) {
        /*const paciente: Paciente = {
            id: '',
            nome: nome,
            fone: fone,
            email: email,
            senha: senha,
            estado:estado,
            datanasc:datanasc,
            

        };*/
        const dadosCliente = new FormData();
        dadosCliente.append("nome", nome);
        dadosCliente.append('fone', fone);
        dadosCliente.append('email', email);
        dadosCliente.append('senha', senha);
        dadosCliente.append('estado', estado);
        dadosCliente.append('datanasc', datanasc);
        dadosCliente.append('imagem', imagem);

        this.httpClient.post<{ mensagem: string, cliente: Paciente }>
            ('http://localhost:3000/api/clientes', dadosCliente).subscribe(
                (dados) => {
                    /*cliente.id = dados.id;*/
                    const paciente: Paciente = {
                        id: dados.cliente.id,
                        nome: nome,
                        fone: fone,
                        email: email,
                        senha: senha,
                        estado: estado,
                        datanasc: datanasc,
                        imagemURL: dados.cliente.imagemURL
                    };
                    this.pacientes.push(paciente);
                    this.listaPacienteAtualizada.next([...this.pacientes]);
                    this.router.navigate(['/']);
                }
            )
    }
    getpaciente(idPaciente: string) {
        //return {...this.pacientes.find((cli) => cli.id === idpaciente)};
        return this.httpClient.get<{ _id: string, nome: string, fone: string, email: string, senha: string, estado: string, datanasc: string }>(`http://localhost:3000/api/pacientes/${idPaciente}`);

    }

    getListaDePacientesAtualizadaObservable() {
        return this.listaPacienteAtualizada.asObservable();
    }
    removerPaciente(id: string): void {
        this.httpClient.delete(`http://localhost:3000/api/pacientes/${id}`).subscribe(() => {
            this.pacientes = this.pacientes.filter((pac) => {
                return pac.id !== id
            });
            this.listaPacienteAtualizada.next([...this.pacientes]);
        });
    }
    atualizarPaciente(id: string, nome: string, fone: string, email: string, senha: string, estado: string, datanasc: string) {
        const paciente: Paciente = { id, nome, fone, email, senha, estado, datanasc, imagemURL: null };
        this.httpClient.put(`http://localhost:3000/api/pacientes/${id}`, paciente)
            .subscribe((res => {
                const copia = [...this.pacientes];
                const indice = copia.findIndex(pac => pac.id === paciente.id);
                copia[indice] = paciente;
                this.pacientes = copia;
                this.listaPacienteAtualizada.next([...this.pacientes]);
                this.router.navigate(['/pacientelista'])
            }));
    }
}