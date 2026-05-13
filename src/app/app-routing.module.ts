import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './shared/components/public-layout/public-layout/public-layout.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/public-admin.module').then(m => m.PublicAdminModule)
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '',             loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
      { path: 'home',         loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
      { path: 'about',        loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule) },
      { path: 'services',     loadChildren: () => import('./modules/services/services.module').then(m => m.ServicesModule) },
      { path: 'doctors',      loadChildren: () => import('./modules/doctors/doctors.module').then(m => m.DoctorsModule) },
      { path: 'patient-info', loadChildren: () => import('./modules/patient-info/patient-info.module').then(m => m.PatientInfoModule) },
      { path: 'contact',      loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule) },
      { path: 'booking',      loadChildren: () => import('./modules/booking/booking.module').then(m => m.BookingModule) },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
