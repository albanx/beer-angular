import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  beerObject: any;
  isLoading = false;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getRandomBeer().subscribe((data: any) => {
      this.beerObject = data[0];
      this.isLoading = false;
    });
  }
}
