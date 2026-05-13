import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  roles: string[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: User | null = null;
  isCollapsed = false;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: '📊', roles: ['admin', 'doctor', 'nurse', 'pharmacist', 'lab_tech', 'receptionist'] },
    { label: 'Patients', route: '/patient', icon: '👥', roles: ['admin', 'doctor', 'nurse', 'receptionist'] },
    { label: 'Appointments', route: '/appointments', icon: '📅', roles: ['admin', 'doctor', 'receptionist'] },
    { label: 'Pharmacy', route: '/pharmacy', icon: '💊', roles: ['admin', 'pharmacist'] },
    { label: 'Lab', route: '/lab', icon: '🔬', roles: ['admin', 'lab_tech', 'doctor'] },
    { label: 'Inventory', route: '/inventory', icon: '📦', roles: ['admin', 'pharmacist'] },
    { label: 'Payments', route: '/payments', icon: '💳', roles: ['admin', 'receptionist'] },
    { label: 'Reports', route: '/reports', icon: '📈', roles: ['admin'] },
    { label: 'Hospital Setup', route: '/onboarding', icon: '🏥', roles: ['admin', 'super_admin'] },
    { label: 'Admin', route: '/admin', icon: '⚙️', roles: ['admin'] }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  hasAccess(item: MenuItem): boolean {
    return this.currentUser ? item.roles.includes(this.currentUser.role) : false;
  }
}
