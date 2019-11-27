import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/models/Car.model';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit, OnDestroy {

  carForm: FormGroup;
  cars: Car[];
  carsSubscription: Subscription;
  editCar: boolean = false;
  photoUploading: boolean = false;
  photoUploaded: boolean = false;
  photosAdded: any[] = [];

  
  constructor(private formBuilder: FormBuilder, private carsService: CarsService) { }

  ngOnInit() {
    this.initForm();
    this.carsSubscription = this.carsService.carsSubject.subscribe(
      (cars: Car[]) => {
        this.cars = cars;
      } 
    );

    this.carsService.getCars();
    this.carsService.emitCars();
  }

  initForm() {
    this.carForm = this.formBuilder.group({
        id: [''],
        modele: ['', Validators.required],
        marque: ['', Validators.required],
        kilometres: ['', Validators.required],
        annee: ['', Validators.required],
        carburant: ['', Validators.required],
        prix: ['', Validators.required],
        boite: ['', Validators.required],
        description: ['']
    });
  }

  resetCarForm()
  {
    this.editCar = false;
    this.carForm.reset();
    this.photosAdded = [];
    this.photoUploaded = false;
    this.photoUploading = false;
  }

  onSaveCar() {
    const id = this.carForm.get('id').value;
    const modele = this.carForm.get('modele').value;
    const marque = this.carForm.get('marque').value;
    const kilometres = this.carForm.get('kilometres').value;
    const annee = this.carForm.get('annee').value;
    const carburant = this.carForm.get('carburant').value;
    const prix = this.carForm.get('prix').value;
    const boite = this.carForm.get('boite').value;
    const description = this.carForm.get('description').value;
    const photos = this.photosAdded ? this.photosAdded: [];
    const newCar = new Car(modele, marque, kilometres, annee,carburant, prix, boite, description ,photos);

    if (this.editCar == true){
       this.carsService.updateCar(newCar, id); 
    }else{
      this.carsService.createCar(newCar);
    }
    
    $('#carsFormModal').modal('hide');
    this.resetCarForm();
  }

  ngOnDestroy()
  {
    this.carsSubscription.unsubscribe();
  }

  onDeleteCar(car: Car){
    $('#popup_mail_confirm').modal('toggle');
     
      // if(car.photos){
      //   car.photos.forEach(photo=>{
      //     this.carsService.removeCarPhoto(photo);
      //   })
        
      // }
      // this.carsService.removeCar(car);
  }

  onEditCar(car: Car, id: number){
    $('#carsFormModal').modal('show');
    this.carForm.get('id').setValue(id);
    this.carForm.get('modele').setValue(car.modele);
    this.carForm.get('marque').setValue(car.marque);
    this.carForm.get('kilometres').setValue(car.kilometres);
    this.carForm.get('annee').setValue(car.annee);
    this.carForm.get('carburant').setValue(car.carburant);
    this.carForm.get('prix').setValue(car.prix);
    this.carForm.get('boite').setValue(car.boite);
    this.carForm.get('description').setValue(car.description);
    this.photosAdded = car.photos; 
    this.editCar = true;
    
  }


  detectFile(event){
    this.photoUploaded =false;
    this.photoUploading =true;
    this.carsService.uploadFile(event.target.files[0]).then(
          (url: string) => {
            this.onAddphoto(url);
            this.photoUploading = false;
            this.photoUploaded = true;
          }
    );
  }

  onAddphoto(url: string) {
    this.photosAdded.push(url);
  }

  onRemoveAddedPhoto(id: number){
    this.carsService.removeCarPhoto(this.photosAdded[id]);
    this.photosAdded.splice(id, 1);
  }
  
}

