import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { Ticket } from './classes/ticket'

@Component({
    selector: 'my-ticket',
    templateUrl: '../layout/app.ticket.html',
    styleUrls: [''],
})
export class AppTicket implements OnChanges, OnInit { 
    @Input() ticket: Ticket;

    public timeString: string = ''
    public travelTime: string[] = []

    ngOnChanges(): void{
        let time: string = ''
        if (new Date(this.ticket.segments[0].date).getHours() < 10 ){
            time+='0'
        }
        time+=new Date(this.ticket.segments[0].date).getHours()+':'
        if (new Date(this.ticket.segments[0].date).getMinutes() < 10 ){
            time+='0'
        }
        time+=new Date(this.ticket.segments[0].date).getMinutes()
        this.timeString = time

        //console.log(this.ticket)
    }

    ngOnInit(): void{
        console.log('ngOnInit')
        console.log(this.ticket.travelTime(0))
        this.travelTime.push(this.ticket.travelTime(0))
        this.travelTime.push(this.ticket.travelTime(1))
        console.log(this.travelTime)
    }

}