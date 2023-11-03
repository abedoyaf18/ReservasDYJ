import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser } from './register-user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url:string="http://localhost:8080/register";

  constructor(private http:HttpClient) { }

  create(client:RegisterUser):Observable<RegisterUser>{
    return this.http.post<RegisterUser>(this.url,client);
  }


}