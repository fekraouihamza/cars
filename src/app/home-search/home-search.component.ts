// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
// import { Observable, Subject } from 'rxjs';
// import { CarsService } from '../services/cars.service';
// import { Car } from '../models/Car.model';


// @Component({
//   selector: 'app-home-search',
//   templateUrl: './home-search.component.html',
//   styleUrls: ['./home-search.component.css']
// })
// export class HomeSearchComponent implements OnInit {

//   private searchTerms = new Subject<string>();
// 	cars$: Observable<any>;
//   constructor(
//     private CarsService : CarsService,
// 		private router: Router
//   ) { }

//   search(term: string): void {
//   this.searchTerms.next(term);
//   this.searchTerms.pipe(
//     debounceTime(1000),
//     // ignorer la recherche en cours si c'est la même que la précédente
//     distinctUntilChanged(),
//   )
//   .subscribe(
//     term => console.log(term)
//   );
  
// 	}

//   ngOnInit(): void {
//    this.cars$ = this.searchTerms.pipe(
//     // map(term => term.trim()),
//     // attendre 1000ms de pause entre chaque requête
//     debounceTime(1000),
//     // ignorer la recherche en cours si c'est la même que la précédente
//     distinctUntilChanged(),
//     // on retourne la liste des résultats correpsondant aux termes de la recherche
//     switchMap((term: string) => this.CarsService.searchCars(term)),
//   )
//   }

//   onViewCar(id: number) {
//     this.router.navigate(['/car', id]);  
//   }


 


// }
