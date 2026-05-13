import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.css']
})
export class SkeletonLoaderComponent {
  @Input() lines = 3;
  
  get items() {
    return Array(this.lines).fill(0);
  }
  
  getWidth() {
    return Math.random() * 40 + 60 + '%';
  }
}