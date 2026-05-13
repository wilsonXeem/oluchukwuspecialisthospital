import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DoctorsComponent } from './doctors.component';

const routes: Routes = [{ path: '', component: DoctorsComponent }];

@NgModule({
  declarations: [DoctorsComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class DoctorsModule {}
