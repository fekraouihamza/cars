import { Component, OnInit, OnDestroy } from '@angular/core';
import { Car } from '../models/Car.model';
import { Subscription } from 'rxjs';
import { CarsService } from '../services/cars.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
   

  cars: Car[];
  carsSubscription: Subscription;
  searchForm: FormGroup;

 
  constructor(private carsService: CarsService,
              private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.carsSubscription= this.carsService.carsSubject.subscribe(
      (cars: Car[]) => {
        this.cars = cars;
      }
    );
    this.carsService.getCars();
    this.carsService.emitCars();
    this.initForm();
  }

  initForm(){
    this.searchForm = this.formBuilder.group({
      modeleRechercher : ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{3,}/)]]
    });
  }
  // oncherche(){
  //   const modeleRechercher = this.searchForm.get('modeleRechercher').value;
  //   console.log(modeleRechercher);
  //   this.router.navigate(['/cars', modeleRechercher]);
  //   this.searchForm.reset();
  //   console.log('okok');
  // }

  ngOnDestroy() {
    this.carsSubscription.unsubscribe();
  }

  onViewCar(id: number) {
    this.router.navigate(['/car', id]);  
  }

}
