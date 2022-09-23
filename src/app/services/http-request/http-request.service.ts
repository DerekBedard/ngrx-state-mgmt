import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  people: any = {};

  constructor(private httpClient: HttpClient) {}

  mockApiCall(): void {
    setTimeout(() => {
      this.httpClient.get("assets/mock-data.json").subscribe(data =>{
        this.people = data;
        console.log("Mock API data: ", this.people);
      })
    }, 1000);
  }

}
