import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Agenda } from './models/agenda';

@Component({
	selector: 'app-agenda',
	templateUrl: './agenda.component.html',
	styleUrls: [ './agenda.component.css' ]
})
export class AgendaComponent implements OnInit {
	public agenda: Agenda;

	constructor() {
		this.agenda = new Agenda();
	}

	ngOnInit() {}

	cadastrar(form: NgForm) {
		console.log(this.agenda);
	}
}