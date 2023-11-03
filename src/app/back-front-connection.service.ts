import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackFrontConnectionService {

  private backendUrl="api/v1/client"

  constructor() { }
}