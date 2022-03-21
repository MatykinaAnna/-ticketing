import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpServiceParam{

    constructor(private http: HttpClient){ }
      
    getData(searchId: string){
        return this.http.get('https://front-test.beta.aviasales.ru/tickets?searchId='+searchId)
    }
}