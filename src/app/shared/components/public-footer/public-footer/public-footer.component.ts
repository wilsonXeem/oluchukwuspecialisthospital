import { Component } from '@angular/core';
import { HOSPITAL, SERVICES } from '../../../../core/constants/hospital.constants';

@Component({
  selector: 'app-public-footer',
  templateUrl: './public-footer.component.html',
  styleUrls: ['./public-footer.component.css']
})
export class PublicFooterComponent {
  hospital = HOSPITAL;
  services = SERVICES;
  year = new Date().getFullYear();
}