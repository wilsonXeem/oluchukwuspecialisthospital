import { Component, Input, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.css']
})
export class ChartWidgetComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() type: 'line' | 'bar' | 'doughnut' | 'pie' = 'line';
  @Input() data: any = null;
  @Input() width: number = 400;
  @Input() height: number = 200;
  
  @ViewChild('chartCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  
  ngOnInit() {
    this.renderChart();
  }
  
  ngOnDestroy() {}
  
  private renderChart() {
    setTimeout(() => {
      const ctx = this.canvas.nativeElement.getContext('2d');
      if (!ctx) return;
      
      ctx.clearRect(0, 0, this.width, this.height);
      
      if (this.type === 'line') {
        this.drawLineChart(ctx);
      } else if (this.type === 'doughnut') {
        this.drawDoughnutChart(ctx);
      } else {
        this.drawBarChart(ctx);
      }
    }, 100);
  }
  
  private drawLineChart(ctx: CanvasRenderingContext2D) {
    const padding = 40;
    const chartWidth = this.width - 2 * padding;
    
    // Draw axes
    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, this.height - padding);
    ctx.lineTo(this.width - padding, this.height - padding);
    ctx.stroke();
    
    // Draw sample line
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, this.height - padding - 20);
    ctx.lineTo(padding + chartWidth * 0.3, this.height - padding - 60);
    ctx.lineTo(padding + chartWidth * 0.6, this.height - padding - 40);
    ctx.lineTo(padding + chartWidth * 0.9, this.height - padding - 80);
    ctx.stroke();
    
    // Add points
    ctx.fillStyle = '#007bff';
    [0.3, 0.6, 0.9].forEach((x, i) => {
      const heights = [60, 40, 80];
      ctx.beginPath();
      ctx.arc(padding + chartWidth * x, this.height - padding - heights[i], 3, 0, 2 * Math.PI);
      ctx.fill();
    });
  }
  
  private drawDoughnutChart(ctx: CanvasRenderingContext2D) {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const innerRadius = radius * 0.6;
    
    const segments = [
      { value: 30, color: '#28a745', label: 'Available' },
      { value: 50, color: '#ffc107', label: 'Busy' },
      { value: 20, color: '#dc3545', label: 'Unavailable' }
    ];
    
    let currentAngle = -Math.PI / 2;
    
    segments.forEach(segment => {
      const segmentAngle = (segment.value / 100) * 2 * Math.PI;
      
      ctx.fillStyle = segment.color;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + segmentAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + segmentAngle, currentAngle, true);
      ctx.closePath();
      ctx.fill();
      
      currentAngle += segmentAngle;
    });
  }
  
  private drawBarChart(ctx: CanvasRenderingContext2D) {
    const padding = 40;
    const chartWidth = this.width - 2 * padding;
    const chartHeight = this.height - 2 * padding;
    const barWidth = chartWidth / 5;
    
    // Draw axes
    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, this.height - padding);
    ctx.lineTo(this.width - padding, this.height - padding);
    ctx.stroke();
    
    // Draw bars
    const values = [40, 65, 30, 80, 55];
    const colors = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1'];
    
    values.forEach((value, i) => {
      const barHeight = (value / 100) * chartHeight;
      const x = padding + i * barWidth + barWidth * 0.1;
      const y = this.height - padding - barHeight;
      
      ctx.fillStyle = colors[i];
      ctx.fillRect(x, y, barWidth * 0.8, barHeight);
    });
  }
}