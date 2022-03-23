import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { HttpClientModule }   from '@angular/common/http';
import { AppTicket } from './app.ticket';
import { FormsModule }   from '@angular/forms';

@NgModule({
    imports:      [ BrowserModule, HttpClientModule, FormsModule ],
    declarations: [ AppComponent, AppTicket ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }