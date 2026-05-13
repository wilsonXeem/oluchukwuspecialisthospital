import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicService, AppointmentBooking } from '../../core/services/public.service';
import { HOSPITAL, SERVICES } from '../../core/constants/hospital.constants';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {
  hospital = HOSPITAL;
  services = SERVICES;
  bookingForm: FormGroup;
  submitting = false;
  submitted = false;
  errorMessage = '';
  minDate = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder, private publicService: PublicService) {
    this.bookingForm = this.fb.group({
      patientName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', Validators.required],
      email: [''],
      serviceId: [''],
      appointmentDate: [''],
      appointmentTime: [''],
      message: ['']
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      this.submitting = true;
      this.errorMessage = '';
      const data: AppointmentBooking = {
        patientName: this.bookingForm.value.patientName,
        phone: this.bookingForm.value.phone,
        email: this.bookingForm.value.email,
        doctorId: '',
        appointmentDate: this.bookingForm.value.appointmentDate,
        appointmentTime: this.bookingForm.value.appointmentTime,
        reason: this.bookingForm.value.message
      };
      this.publicService.bookAppointment(data).subscribe({
        next: () => {
          this.submitted = true;
          this.submitting = false;
        },
        error: () => {
          this.errorMessage = 'Failed to submit. Please call us directly on ' + this.hospital.phone;
          this.submitting = false;
        }
      });
    } else {
      Object.keys(this.bookingForm.controls).forEach(k => this.bookingForm.get(k)?.markAsTouched());
    }
  }

  getFieldError(field: string): string {
    const c = this.bookingForm.get(field);
    if (c?.errors && c.touched) {
      if (c.errors['required']) return `${field === 'patientName' ? 'Full name' : field} is required`;
      if (c.errors['minlength']) return 'Too short';
    }
    return '';
  }

  resetForm(): void {
    this.submitted = false;
    this.bookingForm.reset();
    this.errorMessage = '';
  }
}
