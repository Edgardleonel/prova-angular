import { Component, OnInit } from '@angular/core';
import { CepService } from '../services/cep.service';
import { Service } from '../services/service';
import { Persons } from '../interface/persons';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

	public persons: Persons;

	public columns = ['name', 'cpf', 'phone', 'email', 'cep', 'state', 'city', 'street', 'actions']
	public selectedPerson
	public loading

	constructor(
    public cep: CepService,
    private service: Service
  	) { }
  
  	ngOnInit() {
		if (!this.service.get() || !JSON.parse(this.service.get()).length) 
		this.service.populateTable()
		this.persons = JSON.parse(this.service.get())
	}

	public addPerson() {
		this.selectedPerson = {}
	}

	public editPerson(person) {
		this.selectedPerson = { ...person }
	}

	public deletePerson(person) {
		this.service.remove(person)
		this.persons = JSON.parse(this.service.get())
	}

	public changeCep(event) {
		let cep = event.target.value
		if (cep.length == 8) {
			this.loading = true
			this.cep.getCep(cep).then((apiResponse: any) => {
				if (apiResponse.erro) {
					alert('Cep não encontrado')
				} else {
					this.selectedPerson = {
						...this.selectedPerson,
						cep: apiResponse.cep.replace('-', ''),
						state: apiResponse.uf,
						city: apiResponse.localidade,
						street: apiResponse.logradouro
					}
				}
			}).catch(error => {
				alert('Erro ao buscar o cep')
				console.error(error)
			}).finally(() => this.loading = false)
		}
	}

	public cancel() {
		this.selectedPerson = null
	}

	public submit(person) {
		let error = false
		this.columns.forEach(key => {
			if (key != 'actions' && !person[key]) {
				error = true
			} 
		})

		if (error) {
			alert('Erro!\nPreencha todos os campos!')
		} else {
			this.service.save(person)
			this.persons = JSON.parse(this.service.get())
			this.selectedPerson = null
		}
	}

}
 