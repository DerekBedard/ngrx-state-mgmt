import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from './services/http-request/http-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private httpRequestService: HttpRequestService
  ) {}

  ngOnInit() {
    this.httpRequestService.mockApiCall();
  }

}
