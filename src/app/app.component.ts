import { Component, OnInit } from '@angular/core';
import { HttpService} from './http.service';
import { HttpServiceParam} from './http.serviceParam';
import { HttpClient} from '@angular/common/http';
import { Ticket } from './classes/ticket'
     
@Component({
    selector: 'my-app',
    templateUrl: '../layout/app.component.html',
    styleUrls: ['../style/app.component.css'],

    providers: [HttpService]
})
export class AppComponent implements OnInit { 
    private httpServiceGetSearchId: HttpService;
    private httpServiceGetTickets: HttpServiceParam;
    public tickets: Ticket[] = []

    constructor( private http: HttpClient ){
        this.httpServiceGetSearchId = new HttpService(http, 'https://front-test.beta.aviasales.ru/search')
        this.httpServiceGetTickets = new HttpServiceParam(http)
    }

    ngOnInit(): void{ 
        this.httpServiceGetSearchId.getData().subscribe((data:any) => {
            let searchId: string = data.searchId
            this.getPackOfTickets(searchId)
        });
    }

    getPackOfTickets(searchId: string): void{
        this.httpServiceGetTickets.getData(searchId).subscribe((data: {tickets: Ticket[], stop: boolean}) => {
            data.tickets.forEach(element => {
                this.tickets.push(element)
            });
            if (!data.stop){
                this.getPackOfTickets(searchId)
            }
        });
    }

    sortForPrice(): void{
        this.tickets.sort(function(a: Ticket, b: Ticket) {
            return a.price - b.price;
        });
        this.tickets
    }

    sortForDuration(): void{
        this.tickets.sort(function(a: Ticket, b: Ticket) {
            return a.duration - b.duration;
        });
    }

    filterByNumberOfStops(num: number): Array<Ticket>{
        let rezult: Ticket[] = []
        this.tickets.forEach((element: Ticket)=>{
            if (element.numberOfStops == num){
                rezult.push(element)
            }
        })
        return rezult
    }
}