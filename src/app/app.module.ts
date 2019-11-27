import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { AdminCarsComponent } from './admin/admin-cars/admin-cars.component';
import { SingleCarComponent } from './single-car/single-car.component';
// import { HomeSearchComponent } from './home-search/home-search.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminSigninComponent,
    AdminDashboardComponent,
    HomeComponent,
    AdminCarsComponent,
    SingleCarComponent,
    // HomeSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
