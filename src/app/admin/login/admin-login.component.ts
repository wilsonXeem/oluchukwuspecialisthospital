import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  form: FormGroup;
  loading = false;
  error = '';
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Already logged in as content manager
    const user = this.authService.getCurrentUser();
    if (user && ['admin', 'content_manager'].includes(user.role)) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.error = '';

    this.authService.login(this.form.value).subscribe({
      next: (res: any) => {
        const role = res?.user?.role || '';
        if (!['admin', 'content_manager'].includes(role)) {
          this.error = 'Access denied. This portal is for content managers only.';
          this.authService.clearSession();
          this.loading = false;
          return;
        }
        this.router.navigate(['/admin/dashboard']);
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err?.error?.message || 'Invalid email or password.';
        this.loading = false;
      }
    });
  }
}
