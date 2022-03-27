import { Component, SimpleChanges, OnChanges, OnInit, Input } from '@angular/core';
import { Ticket } from './classes/ticket'

@Component({
    selector: 'my-ticket',
    templateUrl: '../layout/app.ticket.html',
    styleUrls: ['../style/app.ticket.css'],
})
export class AppTicket implements OnChanges, OnInit { 
    @Input() ticket: Ticket;

    public price: string
    public timeString: string[] = []
    public travelTime: string[] = []
    public stops: string[] = []
    public cities: string[][] = []


    public my_ticket: Ticket

    // ngOnChanges(obj: SimpleChanges) {
    //     console.log('OnChanges', obj)
    // }

    private transferString(numTransfer: number):string {
        if (numTransfer %10 == 0 || numTransfer %10 > 4){
            return 'ПЕРЕСАДОК'
        } else if (numTransfer %10 >=2 && numTransfer %10 <=4){
            return 'ПЕРЕСАДКИ'
        } 
        return 'ПЕРЕСАДКА'
    }

    ngOnChanges(obj: SimpleChanges): void{
        this.my_ticket = new Ticket(this.ticket.price, this.ticket.carrier, this.ticket.segments)

        this.price = this.my_ticket.getPriceString()    

        this.timeString.push(this.my_ticket.getTimeString(0))
        this.timeString.push(this.my_ticket.getTimeString(1))
        
        this.travelTime.push( this.my_ticket.travelTime(0) )
        this.travelTime.push( this.my_ticket.travelTime(1) )

        this.stops.push( String(this.my_ticket.getStops(0)) + ' ' + this.transferString(Number(this.my_ticket.getStops(0))) )
        this.stops.push( String(this.my_ticket.getStops(1)) + ' ' + this.transferString(Number(this.my_ticket.getStops(1))) )

        this.cities.push( this.my_ticket.segments[0].stops)
        this.cities.push( this.my_ticket.segments[1].stops)
    }

    ngOnInit(): void{
    }

}