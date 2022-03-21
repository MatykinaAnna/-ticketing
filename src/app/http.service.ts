import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService{

    constructor(private http: HttpClient, private url: string){ }
      
    getData(){
        return this.http.get(this.url)
    }
}