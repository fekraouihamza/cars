import { Component, OnInit } from '@angular/core';
import { Car } from '../models/Car.model';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-single-car',
  templateUrl: './single-car.component.html',
  styleUrls: ['./single-car.component.css']
})
export class SingleCarComponent implements OnInit {

  car: Car; 
  constructor(private route: ActivatedRoute, private carsService: CarsService ) { }

  ngOnInit() {
    this.car = new Car('','','','','','','','', []);
    const id = this.route.snapshot.params['id'];
    this.carsService.getSingleCar(+id).then(
      (car: Car) => {
        this.car = car;
      }
    );
  }

}
