import { Injectable } from '@angular/core';
import { persons } from '../database/persons';

@Injectable({
	providedIn: 'root'
})
export class Service {
    private persons = persons

    constructor() { }

    public populateTable() {
        localStorage.setItem('persons', JSON.stringify(this.persons))
    }
    
     public get() {
        return localStorage.getItem('persons')
    }
    
     public save(person) {
        const persons = JSON.parse(localStorage.getItem('persons'))
        let index = persons.findIndex(foundPerson => Number(foundPerson.cpf) == Number(person.cpf))
        if (index == -1) index = persons.length
        persons[index] = person
        localStorage.setItem('persons', JSON.stringify(persons))
    }
    
     public remove(person) {
        const persons = JSON.parse(localStorage.getItem('persons'))
        const cpf = Number(person.cpf)
        let index = persons.findIndex(foundPerson => foundPerson.cpf == String(cpf))
        persons.splice(index, 1)
        localStorage.setItem('persons', JSON.stringify(persons))
    }
    
}