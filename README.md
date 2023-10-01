# Angular demo app

This is sample app angular application, for introduction to Angular, explaing the core concepts.
This project was generated with [Angular CLI].

## Prerequisites
- Node.js
- Angular CLI


## Setup
- Clone the project
- Run `npm install` to install the dependencies
- Run `npm start` to start the application locally

## API used
- https://punkapi.com/documentation/v2 
- https://www.openbrewerydb.org/documentation



## Task 1: Install Angular CLI
```
npm install -g @angular/cli
```

## Task 2: Create a new project called `MyBeerApp`

```
ng new MyBeerApp                   // generates the app ready to run
cd MyBeerApp
ng add @nguniversal/express-engine // optional – adds server side rendering
ng generate environments           // add environment support (dev, int, prod...)
npm start                          // starts local dev server
```

## Task 3: Create a new component called `home``

```
ng generate component home
```

## Task 4: Add navigation bar to the application `app.component.html`

```
<nav>
  <a routerLink="/">Home Beer</a>
  <a routerLink="/search-breweries">Search breweries</a>
  <a routerLink="/account">Login</a>
</nav>

<router-outlet></router-outlet>
```

## Task 5: Add global styles for the navigation bar

```
/* CSS for the navigation bar */
nav {
  background-color: #333;
  display: flex;
}
 nav a {
  color: #fff;
  text-decoration: none;
  padding: 14px 16px;
}
 nav a:hover {
  background-color: #ddd;
  color: #333;
}
```

## Task 6: Add routing to the application `app-routing.module.ts`

```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'search-beer', loadChildren: () => import('./beer-module').then((m) => m.BeerModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

## Task 7: Add an Angular Service called `api.service.ts`

- Add the service with the following command
```
ng generate service services/api
```

- Set the content of the service to the following:
```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
}
```

## Task 8: Import the Angular HTTP Client module in `app.module.ts`

- Import the Angular HTTP Client module in `app.module.ts`
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Task 9: Add `getRandomBeer` function to the `api.service.ts`

```
  getRandomBeer() {
    return this.http.get('https://api.punkapi.com/v2/beers/random');
  }
```

## Taks 10: Call the beer api in Home Component `home.component.ts`

```
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
```

## Task 11: Display the beer data in the Home Component `home.component.html`

```
<h2>The beer of the day is</h2>

<p *ngIf="isLoading">Loading the beer ...</p>

<div class="container">
  <div class="card" *ngIf="beerObject">
    <img src="{{ beerObject.image_url }}" class="image" alt="..." />
    <div class="card-body">
      <h3 class="card-title">{{ beerObject.name | uppercase }}</h3>
      <p>
        {{ beerObject.description }}
      </p>
    </div>
  </div>
</div>

```

Add the following styles to the `home.component.scss` file

```
.card {
  border-radius: 1rem;
  color: #000;
  overflow: hidden;
  box-shadow: 2px 3px 5px #adabab;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  text-align: left;
  margin: 4px;
  width: 290px;
}


.image {
    height: 20rem;
    object-fit: contain;
}

.card-body  {
    padding: 1rem;
}

.container {
    width: 100%;
    justify-content: center;
    display: flex;
}
```

Task 12: Add a button to the Home Component `home.component.html` that refreshes the beer

```
<button class="btn btn-primary" (click)="getRandomBeer()">Get another beer</button>
```

Task 13: Add a lazy load module to search for breweries

Requirements:
- The module should search Breweries using this api https://api.openbrewerydb.org/v1/breweries?by_city=dublin&per_page=3
- The main component of the module should have a filter by city (see api above)
- The module should display a list of Breweries
- Module should be lazy loaded by Angular
