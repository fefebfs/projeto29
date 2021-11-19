import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,NgForm,Validators } from '@angular/forms';
import { PacienteService } from '../paciente.service';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { Paciente } from '../paciente.model';

@Component({
selector: 'app-paciente-inserir',
templateUrl: './paciente-inserir.component.html',
styleUrls: ['./paciente-inserir.component.css'],
})

export class PacienteInserirComponent implements OnInit {

    private modo: string = "criarPaciente";
    private idPaciente: string | null = null;
    public paciente: Paciente | undefined;
    public estaCarregando: boolean=false;
    form!: FormGroup;

    ngOnInit() {
        this.form = new FormGroup({
            nome: new FormControl (null, {
            validators: [Validators.required, Validators.minLength(3)]
            }),
            fone: new FormControl (null, {
            validators: [Validators.required]
            }),
            email: new FormControl (null, {
            validators: [Validators.required, Validators.email]
            }),
            senha:new FormControl(null,{
                validators:[Validators.required,Validators.minLength(6)]
            }),
            estado:new FormControl(null,{
                validators:[Validators.required]
            }),
            datanasc:new FormControl(null,{
                validators:[Validators.required]
            })
        })
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("idPaciente")) {
                this.modo = "editarPaciente";
                this.idPaciente = paramMap.get("idPaciente");
                this.estaCarregando=true;
                this.pacienteService.getpaciente(this.idPaciente!).subscribe(dadosPac => {
                    this.estaCarregando=false;
                    this.paciente = {
                    id: dadosPac._id,
                    nome: dadosPac.nome,
                    fone: dadosPac.fone,
                    email: dadosPac.email,
                    senha:dadosPac.senha,
                    estado:dadosPac.estado,
                    datanasc:dadosPac.datanasc,
                    imagemURL:null

                    };
                    this.form.setValue({
                        nome: this.paciente.nome,
                        fone: this.paciente.fone,
                        email: this.paciente.email,
                        senha:this.paciente.senha,
                        estado:this.paciente.estado,
                        datanasc:this.paciente.datanasc
                    })
                    });
                }
                else{
                this.modo = "criarPaciente";
                this.idPaciente=null;
                }
                });
                }
constructor(public pacienteService: PacienteService,public route: ActivatedRoute) {}

onSalvarPaciente() {
    if (this.form.invalid) {
    return;
    }
    this.estaCarregando=true;
    if (this.modo ==="criarPaciente"){
        this.pacienteService.adicionarPaciente(
    this.form.value.nome,
    this.form.value.fone,
    this.form.value.email,
    this.form.value.senha,
    this.form.value.estado,
    this.form.value.datanasc,
    this.form.value.imagem
        );
    }else{
        this.pacienteService.atualizarPaciente(
            this.idPaciente!,
            this.form.value.nome,
            this.form.value.fone,
            this.form.value.email,
            this.form.value.senha,
            this.form.value.estado,
            this.form.value.datanasc


        )
    }

    this.form.reset();
    }
    
}
