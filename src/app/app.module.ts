import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { HttpClientModule }   from '@angular/common/http';
import { AppTicket } from './app.ticket';

@NgModule({
    imports:      [ BrowserModule, HttpClientModule ],
    declarations: [ AppComponent, AppTicket ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }