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
  MatTooltipModule
} from '@angular/material';
// component
import { GeneralMenuComponent } from './components/shared/general-menu/general-menu.component';
import { GeneralTableComponent } from './components/shared/general-table/general-table.component';
import { LoginComponent } from './components/user/login/login.component';
import { NewUserComponent } from './components/user/new-user/new-user.component';
import { CondominiosListComponent } from './components/condominios/condominios-list/condominios-list.component';
// npm

@NgModule({
  declarations: [
    AppComponent,
    GeneralMenuComponent,
    GeneralTableComponent,
    LoginComponent,
    NewUserComponent,
    CondominiosListComponent
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
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
