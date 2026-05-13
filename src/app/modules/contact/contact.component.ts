import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicService, ContactSubmission } from '../../core/services/public.service';
import { HOSPITAL } from '../../core/constants/hospital.constants';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  hospital = HOSPITAL;
  contactForm: FormGroup;
  submitting = false;
  submitted = false;
  submitMessage = '';

  constructor(private fb: FormBuilder, private publicService: PublicService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', Validators.required],
      email: [''],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submitting = true;
      const formData: ContactSubmission = this.contactForm.value;
      this.publicService.submitContact(formData).subscribe({
        next: (res) => {
          this.submitted = true;
          this.submitMessage = res.message || 'Your message has been sent. We will get back to you shortly.';
          this.contactForm.reset();
          this.submitting = false;
        },
        error: () => {
          this.submitMessage = 'Failed to send message. Please call us directly on ' + this.hospital.phone;
          this.submitting = false;
        }
      });
    } else {
      Object.keys(this.contactForm.controls).forEach(k => this.contactForm.get(k)?.markAsTouched());
    }
  }

  getFieldError(field: string): string {
    const c = this.contactForm.get(field);
    if (c?.errors && c.touched) {
      if (c.errors['required']) return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      if (c.errors['minlength']) return `${field.charAt(0).toUpperCase() + field.slice(1)} is too short`;
    }
    return '';
  }

  resetForm(): void {
    this.submitted = false;
    this.submitMessage = '';
    this.contactForm.reset();
  }
}
