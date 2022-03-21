import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from './classes/ticket'

@Component({
    selector: 'my-ticket',
    templateUrl: '../layout/app.ticket.html',
    styleUrls: [''],
})
export class AppTicket implements OnInit { 
    @Input() ticket: Ticket;

    public timeString: string

    ngOnInit(): void{
        
    }

}