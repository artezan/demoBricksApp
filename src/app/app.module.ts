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
  MatAutocompleteModule,
  MatExpansionModule,
  MatDialogModule,
  MatRadioModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatTabsModule,
  MatCheckboxModule,
  MatProgressSpinnerModule
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
import { ListProvidersComponent } from './components/providers/list-providers/list-providers.component';
import { NewEditProvidersComponent } from './components/providers/new-edit-providers/new-edit-providers.component';
import { ListServicesComponent  } from './components/service-condo/list-services/list-services.component';
import { NewEditServicesComponent } from './components/service-condo/new-edit-services/new-edit-services.component';
import { NewEgressServicesComponent } from './components/service-condo/new-egress-services/new-egress-services.component';
import { NewEgressVarServicesComponent } from './components/service-condo/new-egress-var-services/new-egress-var-services.component';
import { ListIngressComponent } from './components/ingress/list-ingress/list-ingress.component';
import { NewIngressComponent } from './components/ingress/new-ingress/new-ingress.component';
import { PaymentComponent } from './components/ingress/payment/payment.component';
import { ListEgressComponent } from './components/egress/list-egress/list-egress.component';
import { NewEgressFixedComponent } from './components/egress/new-egress-fixed/new-egress-fixed.component';
import { NewEgressVariableComponent } from './components/egress/new-egress-variable/new-egress-variable.component';
import { GeneralDialogComponent } from './components/shared/general-dialog/general-dialog.component';
import { NewDebitComponent } from './components/debit/new-debit/new-debit.component';
import { GeneralAlertComponent } from './components/shared/general-alert/general-alert.component';
import { NewReportsComponent } from './components/reports/new-reports/new-reports.component';

// npm


@NgModule({
  entryComponents: [ GeneralDialogComponent, GeneralAlertComponent],
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
    NewEditRenterComponent,
    ListProvidersComponent,
    NewEditProvidersComponent,
    ListServicesComponent,
    NewEditServicesComponent,
    NewEgressServicesComponent,
    NewEgressVarServicesComponent,
    ListIngressComponent,
    NewIngressComponent,
    PaymentComponent,
    ListEgressComponent,
    NewEgressFixedComponent,
    NewEgressVariableComponent,
    GeneralDialogComponent,
    NewDebitComponent,
    GeneralAlertComponent,
    NewReportsComponent,
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
    MatAutocompleteModule,
    MatExpansionModule,
    MatDialogModule,
    MatRadioModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  providers: [UserService, ],
  bootstrap: [AppComponent]
})
export class AppModule {}
