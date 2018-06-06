import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { NewUserComponent } from './components/user/new-user/new-user.component';
import { CondominiosListComponent } from './components/condominios/condominios-list/condominios-list.component';
import { NuevoEditCondoComponent } from './components/condominios/nuevo-edit-condo/nuevo-edit-condo.component';
import { ListDepaComponent } from './components/depa/list-depa/list-depa.component';
import { ListRenterComponent } from './components/renter/list-renter/list-renter.component';
import { ListPropietariesComponent } from './components/propietaries/list-propietaries/list-propietaries.component';

const routes: Routes = [
  // Rutas
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'new-user', component: NewUserComponent},
  { path: 'list-condo', component: CondominiosListComponent},
  { path: 'new-edit-condo', component: NuevoEditCondoComponent},
  { path: 'list-depa', component: ListDepaComponent},
  { path: 'list-renter', component: ListRenterComponent},
  { path: 'list-propietaries', component: ListPropietariesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
