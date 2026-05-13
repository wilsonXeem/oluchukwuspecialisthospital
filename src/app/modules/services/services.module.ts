import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ServicesComponent } from './services.component';
import { ServiceDetailComponent } from './service-detail.component';

const routes: Routes = [
  { path: '', component: ServicesComponent },
  { path: ':slug', component: ServiceDetailComponent }
];

@NgModule({
  declarations: [ServicesComponent, ServiceDetailComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class ServicesModule {}
