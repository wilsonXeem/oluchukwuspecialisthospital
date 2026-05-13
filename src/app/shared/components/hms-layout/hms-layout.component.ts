import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-hms-layout',
  templateUrl: './hms-layout.component.html',
  styleUrls: ['./hms-layout.component.css']
})
export class HmsLayoutComponent implements OnInit {
  currentUser: any = null;
  sidebarCollapsed = false;
  showUserMenu = false;

  allMenuItems = [
    // Admin / Doctor / Receptionist
    { label: 'Dashboard',     route: '/dashboard',              icon: 'activity',   roles: ['admin','doctor','receptionist'] },
    { label: 'Patients',      route: '/patients',               icon: 'users',      roles: ['admin','doctor','nurse','receptionist'] },
    { label: 'Appointments',  route: '/appointments',           icon: 'calendar',   roles: ['admin','receptionist'] },
    { label: 'My Schedule',   route: '/doctor/appointments',    icon: 'calendar',   roles: ['doctor'] },
    { label: 'Consultations', route: '/doctor/consultations',   icon: 'heart',      roles: ['doctor'] },
    { label: 'Prescriptions', route: '/doctor/prescriptions',   icon: 'scissors',   roles: ['doctor'] },
    { label: 'Lab Results',   route: '/doctor/lab-results',     icon: 'microscope', roles: ['doctor'] },
    // Nurse
    { label: 'Dashboard',     route: '/nurse/dashboard',        icon: 'activity',   roles: ['nurse'] },
    { label: 'Ward Patients', route: '/nurse/ward-patients',    icon: 'users',      roles: ['nurse'] },
    { label: 'Admissions',    route: '/admissions',             icon: 'hospital',   roles: ['nurse'] },
    // Lab Tech
    { label: 'Dashboard',     route: '/lab/dashboard',          icon: 'activity',   roles: ['lab_tech'] },
    { label: 'Worklist',      route: '/lab/worklist',           icon: 'calendar',   roles: ['lab_tech'] },
    { label: 'Test Requests', route: '/lab/requests',           icon: 'calendar',   roles: ['lab_tech'] },
    { label: 'Results',       route: '/lab/results',            icon: 'activity',   roles: ['lab_tech'] },
    { label: 'Patient History', route: '/lab/patient-history',  icon: 'users',      roles: ['lab_tech'] },
    // Pharmacist
    { label: 'Dashboard',     route: '/pharmacy/dashboard',     icon: 'activity',   roles: ['pharmacist'] },
    { label: 'Prescriptions', route: '/pharmacy/prescriptions', icon: 'calendar',   roles: ['pharmacist'] },
    { label: 'Dispense',      route: '/pharmacy/dispensing',    icon: 'heart',      roles: ['pharmacist'] },
    { label: 'Stock',         route: '/pharmacy/stock-check',   icon: 'shield',     roles: ['pharmacist'] },
    // Shared / Admin
    { label: 'Admissions',    route: '/admissions',             icon: 'hospital',   roles: ['admin','receptionist'] },
    { label: 'Laboratory',    route: '/lab',                    icon: 'microscope', roles: ['admin'] },
    { label: 'Pharmacy',      route: '/pharmacy',               icon: 'scissors',   roles: ['admin'] },
    { label: 'Inventory',     route: '/inventory',              icon: 'shield',     roles: ['admin','pharmacist'] },
    { label: 'Payments',      route: '/payments',               icon: 'star',       roles: ['admin','receptionist'] },
    { label: 'Documents',     route: '/documents',              icon: 'info',       roles: ['admin','doctor','nurse'] },
    { label: 'Reports',       route: '/reports',                icon: 'activity',   roles: ['admin'] },
    { label: 'Admin',         route: '/admin',                  icon: 'shield',     roles: ['admin'] },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.authService.currentUser$.subscribe(user => {
      if (user) this.currentUser = user;
    });
  }

  get menuItems() {
    if (!this.currentUser) return [];
    return this.allMenuItems.filter(item => item.roles.includes(this.currentUser.role));
  }

  toggleSidebar(): void { this.sidebarCollapsed = !this.sidebarCollapsed; }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: () => this.authService.clearSession()
    });
  }

  get userInitials(): string {
    if (!this.currentUser) return '?';
    return `${this.currentUser.firstName?.[0] || ''}${this.currentUser.lastName?.[0] || ''}`.toUpperCase();
  }
}
