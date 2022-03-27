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

    constructor(price: number, carrier: string, segments: any){
        this._price = price
        this._carrier = carrier
        this.segments = segments
    }

    private timeString(d: Date){
        let time: string = ''
        if (d.getHours() < 10 ){
            time+='0'
        }
        time+= d.getHours()+':'
        if (d.getMinutes() < 10 ){
            time+='0'
        }
        time+= d.getMinutes()

        return time
    }

    getTimeString(numSegments: number): string{
        let time = this.timeString(new Date(this.segments[numSegments].date))

        let d = new Date(this.segments[numSegments].date)
        d.setMinutes(d.getMinutes() + this.segments[numSegments].duration)
        
        time = time + ' - ' + this.timeString(d)

        return time
    }

    travelTime(numSegments: number ): string{
        return `${(Math.round(this.segments[numSegments].duration / 60))}ч ${this.segments[numSegments].duration % 60}мин`
    }
    getStops(numSegments: number): number{
        return (this.segments[numSegments].stops.length)
    }
    private div(val:number, by:number):number{
        return (val - val % by) / by;
    }

    public get price(){
        return (this._price)
    }
    public getPriceString(){
        let rezult: string[] = []
        let p = this._price
        while (p>0){
            rezult.push((p % 1000).toString())
            p = this.div(p, 1000)
        }
        let rezult1 = ''
        for (let i=rezult.length-1; i>=0 ; i--){
            if (i!=rezult.length-1){
                if (Number(rezult[i])< 100 && Number(rezult[i])> 10){
                    rezult1 += '0'
                }
                if (Number(rezult[i])< 10){
                    rezult1 += '00'
                }
                rezult1 +=rezult[i]
            } else{
                rezult1 +=rezult[i]
            }  
            rezult1 +=' '
        }
        return (rezult1)
    }
    public get carrier(){
        return (this._carrier)
    }
    public get duration(){
        return (this.segments[0].duration + this.segments[1].duration)
    }
    public get flightTimeThere(): Date {
        let d = new Date(this.segments[0].date)
        console.log (d)
        return d
    }
}