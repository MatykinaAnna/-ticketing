export class Ticket {
    // Цена в рублях
    private _price: number
    // Код авиакомпании (iata)
    private _carrier: string
    // Массив перелётов.
    // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
    public segments: [
        {
            // Код города (iata)
            origin: string
            // Код города (iata)
            destination: string
            // Дата и время вылета туда
            date: string
            // Массив кодов (iata) городов с пересадками
            stops: string[]
            // Общее время перелёта в минутах
            duration: number
        },
        {
            // Код города (iata)
            origin: string
            // Код города (iata)
            destination: string
            // Дата и время вылета обратно
            date: string
            // Массив кодов (iata) городов с пересадками
            stops: string[]
            // Общее время перелёта в минутах
            duration: number
        }
    ]

    travelTime(numSegments: number ): string{
        console.log('getTravelTime')
        return `${(this.segments[numSegments].duration / 60)}ч ${this.segments[numSegments].duration % 60}мин`
    }

    public get price(){
        return (this._price)
    }
    public get duration(){
        return (this.segments[0].duration + this.segments[1].duration)
    }
    public get numberOfStops(){
        return (this.segments[0].stops.length + this.segments[1].stops.length)
    }
    public get flightTimeThere(): Date {
        let d = new Date(this.segments[0].date)
        console.log (d)
        return d
    }
    // public get travelTime0(){
    //     console.log('travelTime0')
    //     return `${(this.segments[0].duration / 60)}ч ${this.segments[0].duration % 60}мин`
    // }
    // public get travelTime1(){
    //     return `${(this.segments[1].duration / 60)}ч ${this.segments[1].duration % 60}мин`
    // }
}