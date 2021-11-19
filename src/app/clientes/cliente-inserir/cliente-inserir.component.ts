import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';
import { mimeTypeValidator } from './mime-type.validator';

@Component({
    selector: 'app-cliente-inserir',
    templateUrl: './cliente-inserir.component.html',
    styleUrls: ['./cliente-inserir.component.css'],
})

export class ClienteInserirComponent implements OnInit {

    private modo: string = "criar";
    private idCliente: string | null = null;
    public cliente: Cliente | undefined;
    public estaCarregando: boolean = false;
    form!: FormGroup;
    previewImagem: string | undefined;



    ngOnInit() {
        this.form = new FormGroup({
            nome: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            fone: new FormControl(null, {
                validators: [Validators.required]
            }),
            email: new FormControl(null, {
                validators: [Validators.required, Validators.email]
            }),
            imagem: new FormControl(null, {
                validators: [Validators.required],
                //asyncValidators: [mimeTypeValidator]
            }),
            senha: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(6)]
            }),
            especialidade: new FormControl(null, {
                validators: [Validators.required]
            }),
            crp: new FormControl(null, {
                validators: [Validators.required]
            })
        })
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("idCliente")) {
                this.modo = "editar";
                this.idCliente = paramMap.get("idCliente");
                this.estaCarregando = true;
                this.clienteService.getCliente(this.idCliente!).subscribe(dadosCli => {
                    this.estaCarregando = false;
                    this.cliente = {
                        id: dadosCli._id,
                        nome: dadosCli.nome,
                        fone: dadosCli.fone,
                        email: dadosCli.email,
                        senha: dadosCli.senha,
                        especialidade: dadosCli.especialidade,
                        estado: dadosCli.estado,
                        crp: dadosCli.crp,
                        imagemURL: null,

                    };
                    this.form.setValue({
                        nome: this.cliente.nome,
                        fone: this.cliente.fone,
                        email: this.cliente.email,
                        senha: this.cliente.senha,
                        especialidade: this.cliente.especialidade,
                        estado: this.cliente.estado,
                        crp: this.cliente.crp,
                        
                    })

                });
            }
            else {
                this.modo = "criar";
                this.idCliente = null;
            }
        });
    }
    constructor(public clienteService: ClienteService, public route: ActivatedRoute) { }

    onSalvarCliente() {
        if (this.form.invalid) {
            return;
        }
        this.estaCarregando = true;
        if (this.modo === "criar") {
            this.clienteService.adicionarCliente(
                this.form.value.nome,
                this.form.value.fone,
                this.form.value.email,
                this.form.value.senha,
                this.form.value.especialidade,
                this.form.value.estado,
                this.form.value.crp,
                this.form.value.imagem
            );
        } else {
            this.clienteService.atualizarCliente(
                this.idCliente!,
                this.form.value.nome,
                this.form.value.fone,
                this.form.value.email,
                this.form.value.senha,
                this.form.value.especialidade,
                this.form.value.estado,
                this.form.value.crp


            )
        }

        this.form.reset();
    }
    onImagemSelecionada(event: Event) {
        const arquivo = (event!.target! as HTMLInputElement).files![0];
        this.form.patchValue({ 'imagem': arquivo });
        this.form.get('imagem')!.updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.previewImagem = reader.result as string;
        }
        reader.readAsDataURL(arquivo);
    }

}
