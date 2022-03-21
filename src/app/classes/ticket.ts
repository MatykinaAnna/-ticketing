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
        console.log('flightTimeThere')
        let d = new Date(this.segments[0].date)
        console.log (d)
        return d
    }
}