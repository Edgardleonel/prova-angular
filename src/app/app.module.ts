import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CrudComponent } from './crud/crud.component';

import { CepService } from './services/cep.service';
import { Service } from './services/service';


@NgModule({
	declarations: [
		AppComponent,
		CrudComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		MatTableModule,
		MatInputModule,
		HttpClientModule,
		AppRoutingModule,
	
	],
	providers: [CepService, Service],
	bootstrap: [AppComponent]
})
export class AppModule { }
