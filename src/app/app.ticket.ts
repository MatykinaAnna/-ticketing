import { Component, SimpleChanges, OnChanges, OnInit, Input } from '@angular/core';
import { Ticket } from './classes/ticket'

@Component({
    selector: 'my-ticket',
    templateUrl: '../layout/app.ticket.html',
    styleUrls: [''],
})
export class AppTicket implements OnChanges, OnInit { 
    @Input() ticket: Ticket;

    public timeString: string[] = []
    public travelTime: string[] = []
    public stops: number[] = []
    public cities: string[][] = []

    public my_ticket: Ticket

    // ngOnChanges(obj: SimpleChanges) {
    //     console.log('OnChanges', obj)
    // }

    ngOnChanges(obj: SimpleChanges): void{
        console.log('OnChanges', obj)
        this.my_ticket = new Ticket(this.ticket.price, this.ticket.carrier, this.ticket.segments)

        this.timeString.push(this.my_ticket.getTimeString(0))
        this.timeString.push(this.my_ticket.getTimeString(1))
        
        this.travelTime.push( this.my_ticket.travelTime(0) )
        this.travelTime.push( this.my_ticket.travelTime(1) )

        this.stops.push( this.my_ticket.getStops(0) )
        this.stops.push( this.my_ticket.getStops(0) )

        this.cities.push( this.my_ticket.segments[0].stops)
        this.cities.push( this.my_ticket.segments[1].stops)

        console.log(this.timeString)
        console.log(this.travelTime)
        console.log(this.stops)
        console.log(this.cities)
    }

    ngOnInit(): void{
        console.log('ngOnInit')
        console.log(this.ticket)
    }

}