import { NgxDatatableModule } from 'cesar-table-artezan';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatGridListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatBottomSheetModule,
  MatSnackBarModule,
  MatAutocompleteModule
} from '@angular/material';
// component
import { GeneralMenuComponent } from './components/shared/general-menu/general-menu.component';
import { GeneralTableComponent } from './components/shared/general-table/general-table.component';
import { LoginComponent } from './components/user/login/login.component';
import { NewUserComponent } from './components/user/new-user/new-user.component';
import { CondominiosListComponent } from './components/condominios/condominios-list/condominios-list.component';
import { NuevoEditCondoComponent } from './components/condominios/nuevo-edit-condo/nuevo-edit-condo.component';
import { ListDepaComponent } from './components/depa/list-depa/list-depa.component';
import { ListPropietariesComponent } from './components/propietaries/list-propietaries/list-propietaries.component';
import { ListRenterComponent } from './components/renter/list-renter/list-renter.component';
import { UserService } from './services/user.service';
import { NewEditDepaComponent } from './components/depa/new-edit-depa/new-edit-depa.component';
import { NewEditPropietariesComponent } from './components/propietaries/new-edit-propietaries/new-edit-propietaries.component';
import { NewEditRenterComponent } from './components/renter/new-edit-renter/new-edit-renter.component';
// npm

@NgModule({
  declarations: [
    AppComponent,
    GeneralMenuComponent,
    GeneralTableComponent,
    LoginComponent,
    NewUserComponent,
    CondominiosListComponent,
    NuevoEditCondoComponent,
    ListDepaComponent,
    ListPropietariesComponent,
    ListRenterComponent,
    NewEditDepaComponent,
    NewEditPropietariesComponent,
    NewEditRenterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
