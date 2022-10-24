import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NumberDTO} from "../dto/NumberDTO";
import {MessageAndTime} from "../dto/MessageAndTime";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  saveNumberList(numberList: Array<NumberDTO>):Observable<boolean> {
    console.log('done');
    console.log(numberList.length);
    console.log(numberList);
    return this.http.post<boolean>('http://localhost:8082/api/saveNumberList',numberList);
  }


  setTimeAndMessage(messageAndTime: MessageAndTime):Observable<boolean> {
    return this.http.post<boolean>('http://localhost:8082/api/saveTimeAndMessage',messageAndTime);
  }
}
