import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpService} from './http.service';
import { HttpServiceParam} from './http.serviceParam';
import { HttpClient} from '@angular/common/http';
import { Ticket } from './classes/ticket'
import { Filtr_numTransfer } from './classes/filtr_numTransfer'
     
@Component({
    selector: 'my-app',
    templateUrl: '../layout/app.component.html',
    styleUrls: ['../style/app.component.css'],

    providers: [HttpService]
})
export class AppComponent implements OnInit { 

    @ViewChild('b1', {static: false}) b1: ElementRef;
    @ViewChild('b2', {static: false}) b2: ElementRef;
    @ViewChild('b3', {static: false}) b3: ElementRef;

    private httpServiceGetSearchId: HttpService;
    private httpServiceGetTickets: HttpServiceParam;
    public tickets: Ticket[] = [];
    public ticketsWithoutFilter: Ticket[] = [];
    public filtr_numTransfer: Filtr_numTransfer;
    public numTicketsOnScreen: number = 5;

    constructor( private http: HttpClient, private renderer: Renderer2 ){
        this.httpServiceGetSearchId = new HttpService(http, 'https://front-test.beta.aviasales.ru/search')
        this.httpServiceGetTickets = new HttpServiceParam(http)
    }

    ngOnInit(): void{ 
        this.filtr_numTransfer = new Filtr_numTransfer(true, false, false, false, false)
        
        this.httpServiceGetSearchId.getData().subscribe((data:any) => {
            let searchId: string = data.searchId
            this.getPackOfTickets(searchId)
        });
    }

    ngDoCheck(){
    }

    ngAfterViewInit(){
    }

    applyFilter():void{

    }

    getPackOfTickets(searchId: string): void{
        this.httpServiceGetTickets.getData(searchId).subscribe((data: {tickets: Ticket[], stop: boolean}) => {
            data.tickets.forEach(element => {
                this.tickets.push(element)
            });
            this.ticketsWithoutFilter = this.tickets
        });
    }

    sortForPrice(): void{
        this.renderer.addClass(this.b1.nativeElement, 'active')
        this.renderer.removeClass(this.b2.nativeElement, 'active')
        this.renderer.removeClass(this.b3.nativeElement, 'active')

        this.tickets.sort(function(a: Ticket, b: Ticket) {
            return a.price - b.price;
        });
        //console.log(this.tickets)
    }

    sortForDuration(): void{
        this.renderer.addClass(this.b2.nativeElement, 'active')
        this.renderer.removeClass(this.b1.nativeElement, 'active')
        this.renderer.removeClass(this.b3.nativeElement, 'active')

        this.tickets.sort(function(a: Ticket, b: Ticket) {
            return ( (a.segments[0].duration + a.segments[1].duration) - (b.segments[0].duration + b.segments[1].duration) );
        });
    }
    
    optimal():void{
        this.renderer.addClass(this.b3.nativeElement, 'active')
        this.renderer.removeClass(this.b2.nativeElement, 'active')
        this.renderer.removeClass(this.b1.nativeElement, 'active')

        console.log('оптимальный')
    }

    filterBy():Ticket[]{
        let rezult: Ticket[] = []
        if (this.filtr_numTransfer.all){
            this.filterByNumberOfStops(0).forEach((item)=>{
                rezult.push(item)
            })
            return rezult
        }
        if (this.filtr_numTransfer.one){
            this.filterByNumberOfStops(1).forEach((item)=>{
                rezult.push(item)
            })
        }
        if (this.filtr_numTransfer.two){
            this.filterByNumberOfStops(2).forEach((item)=>{
                rezult.push(item)
            })
        }
        if (this.filtr_numTransfer.three){
            this.filterByNumberOfStops(3).forEach((item)=>{
                rezult.push(item)
            })
        }
        if (this.filtr_numTransfer.without){
            this.filterByNumberOfStops(0).forEach((item)=>{
                rezult.push(item)
            })
        }
        return rezult
    }

    setFilterAll():void{
        if (this.filtr_numTransfer.all){
            this.filtr_numTransfer.one =false
            this.filtr_numTransfer.two =false
            this.filtr_numTransfer.three =false
            this.filtr_numTransfer.without =false
        }
        this.tickets = this.filterBy()
    }

    setFilterOne():void{
        if (this.filtr_numTransfer.one){
            this.filtr_numTransfer.all = false
        }
        this.tickets = this.filterBy()
    }

    setFilterTwo():void{
        if (this.filtr_numTransfer.two){
            this.filtr_numTransfer.all = false
        }
        this.tickets = this.filterBy()
    }

    setFilterThree():void{
        if (this.filtr_numTransfer.three){
            this.filtr_numTransfer.all = false
        }
        this.tickets = this.filterBy()
    }

    setFilterWithout():void{
        if (this.filtr_numTransfer.without){
            this.filtr_numTransfer.all = false
        }
        this.tickets = this.filterBy()
    }

    filterByNumberOfStops(num: number): Array<Ticket>{
        if (num==-1){
            return this.ticketsWithoutFilter
        }
        let rezult: Ticket[] = []
        this.ticketsWithoutFilter.forEach((element: Ticket)=>{
            if (element.segments[0].stops.length+element.segments[1].stops.length == num){
                rezult.push(element)
            }
        })
        return rezult
    }

    addNumTicketsOnScreen():void{
        this.numTicketsOnScreen+=5
    }
}
