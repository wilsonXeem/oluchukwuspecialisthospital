import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../core/services/public.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  facilityAddress = '';
  mapError = false;

  constructor(private publicService: PublicService) {}

  ngOnInit(): void {
    this.loadFacilityInfo();
  }

  encodeURIComponent(str: string): string {
    return encodeURIComponent(str);
  }

  private loadFacilityInfo(): void {
    this.publicService.getFacilityInfo().subscribe({
      next: (info) => {
        this.facilityAddress = info.address || 'Hospital Location';
      },
      error: () => {
        this.mapError = true;
      }
    });
  }
}