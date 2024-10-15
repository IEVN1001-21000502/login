import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoListComponent } from './product/producto-list/producto-list.component';
import { ProductoFilterPipe } from './product/producto-filter.pipe';
import { Ejemplo1Component } from './formulario/ejemplo1/ejemplo1.component';
import { SingInComponent } from './auth/features/sing-in/sing-in.component';
import { SingUpComponent } from './auth/features/sing-up/sing-up.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductoListComponent,
    ProductoFilterPipe,
    Ejemplo1Component,
    SingInComponent,
    SingUpComponent,
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
