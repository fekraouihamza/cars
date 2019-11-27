import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { SingleCarComponent } from './single-car/single-car.component';
import { AuthGuardService } from './services/auth-guard.service';
// import { HomeSearchComponent } from './home-search/home-search.component';
const routes: Routes = [ 
  { path: 'home', component: HomeComponent },
  { path: 'car/:id', component: SingleCarComponent },
  { path: 'admin/login', component: AdminSigninComponent },
  { path: 'admin/dashboard', canActivate: [AuthGuardService], component: AdminDashboardComponent },
  // { path: 'cars/:modeleRechercher', component: HomeSearchComponent },
  { path:  '', redirectTo: 'home', pathMatch: 'full' },
  { path:  '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
