import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url:string="http://localhost:8080/api/v1/client/login";

  constructor(private http:HttpClient) { }

  get(email:String,password:String):Observable<Login>{
    return this.http.get<Login>(this.url+'/'+email+'/'+password);
  }
}