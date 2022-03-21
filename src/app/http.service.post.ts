import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Comment } from "../app/classes/comment";

@Injectable()
export class HttpServicePost{
  
    constructor(private http: HttpClient){ }

    postData(comment: Comment){
         
        const body = {id: comment.id, text: comment.text, date: comment.date};
        return this.http.post(`https://boiling-refuge-66454.herokuapp.com/images/${comment.id}/comments`, body); 
    }
}