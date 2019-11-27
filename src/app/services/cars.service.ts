import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Car } from '../models/Car.model';
import { Subject, Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CarsService {

  cars: Car[] = [];
  carsSubject = new Subject<Car[]>(); 
  myObservable : Observable<number>;

  constructor() { }

  emitCars() {
    this.carsSubject.next(this.cars);
  }

  saveCars() {
    firebase.database().ref('/cars').set(this.cars);
  } 

  searchCars(term: string) {
    if(!term.trim()){
      return of([]);
    } 
    
    //  return this.myObservable = of(1,2,3);
  }


  getCars() {
    firebase.database().ref('/cars').on('value', (data) => {
      this.cars = data.val() ? data.val() : [];
      this.emitCars();
    });
  }

  createCar(newCar: Car){
    this.cars.push(newCar);
    this.saveCars();
    this.emitCars();

  }

  removeCar(car:Car){
    const index = this.cars.findIndex(
      (carEl) => {
        if(carEl === car){
          return true;
        }
      }
    );
    this.cars.splice(index, 1);
    this.saveCars();
    this.emitCars();

  }


  updateCar(car: Car, id: number){
    firebase.database().ref('/cars/' + id).update(car);
  }

  uploadFile(file: File){
    return new Promise(
        (resolve, reject) => {
          const uniqueId = Date.now().toString();
          const upload = firebase.storage().ref().child('images/cars/' + uniqueId + file.name).put(file); 
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
           () => {
              console.log('Loading...');
           },
           (error) => {
             console.log('Error ! : ' + error);
             reject();
           },
           () => {
             upload.snapshot.ref.getDownloadURL().then(function(DownloadURL){
               resolve(DownloadURL); 
             });

           }

           );
        }
    );
  }

  removeCarPhoto(photoLink: string) {
    if(photoLink) {
      const storageRef = firebase.storage().refFromURL(photoLink);
      storageRef.delete().then(
        () => {
          console.log('File deleted');
        }
      ).catch(
        (error) =>{
          console.log('File not found : ' + error);
        }
      );
    }
  }

  getSingleCar(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/cars/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

}
