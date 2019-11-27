import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCa5ccAvZPz1Ww8o8-ExaubNjo9UMw9SwY",
    authDomain: "cars-a0af5.firebaseapp.com",
    databaseURL: "https://cars-a0af5.firebaseio.com",
    projectId: "cars-a0af5",
    storageBucket: "cars-a0af5.appspot.com",
    messagingSenderId: "878340899816",
    appId: "1:878340899816:web:5569f1fe22ad8dbf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }
}
