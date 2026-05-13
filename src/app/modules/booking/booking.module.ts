import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { BookAppointmentComponent } from './book-appointment.component';

const routes: Routes = [
  { path: '', component: BookAppointmentComponent }
];

@NgModule({
  declarations: [BookAppointmentComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class BookingModule { }