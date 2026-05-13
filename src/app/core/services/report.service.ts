import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { PdfExportService } from '../../modules/reports/services/pdf-export.service';
import { ExcelExportService } from '../../modules/reports/services/excel-export.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private favoritesSubject = new BehaviorSubject<any[]>([]);
  private historySubject = new BehaviorSubject<any[]>([]);
  
  favorites$ = this.favoritesSubject.asObservable();
  history$ = this.historySubject.asObservable();

  constructor(
    private api: ApiService,
    private pdfExport: PdfExportService,
    private excelExport: ExcelExportService
  ) {
    this.loadFavorites();
    this.loadHistory();
  }

  getPatientReport(filters: any): Observable<any> {
    return this.api.get('/reports/patients', filters);
  }

  getInventoryReport(filters: any): Observable<any> {
    return this.api.get('/reports/inventory', { params: filters });
  }

  getSalesReport(filters: any): Observable<any> {
    return this.api.get('/reports/revenue', { params: filters });
  }

  getFinancialReport(filters: any): Observable<any> {
    return this.api.get('/reports/financial', { params: filters });
  }

  getAnalyticsReport(filters: any): Observable<any> {
    return this.api.get('/reports/analytics', { params: filters });
  }

  getOperationalReport(filters: any): Observable<any> {
    return this.api.get('/reports/operational', { params: filters });
  }

  exportReport(type: string, data: any, format: 'csv' | 'pdf' | 'excel' = 'csv'): void {
    this.addToHistory({ type, format, timestamp: new Date() });
    
    switch (format) {
      case 'pdf':
        this.exportToPDF(type, data);
        break;
      case 'excel':
        this.exportToExcel(type, data);
        break;
      default:
        this.exportToCSV(type, data);
    }
  }

  emailReport(reportData: any, recipients: string[]): Observable<any> {
    return this.api.post('/reports/email', { reportData, recipients });
  }

  addToFavorites(report: any): void {
    const favorites = this.favoritesSubject.value;
    if (!favorites.find(f => f.id === report.id)) {
      favorites.push({ ...report, addedAt: new Date() });
      this.favoritesSubject.next(favorites);
      localStorage.setItem('reportFavorites', JSON.stringify(favorites));
    }
  }

  removeFromFavorites(reportId: string): void {
    const favorites = this.favoritesSubject.value.filter(f => f.id !== reportId);
    this.favoritesSubject.next(favorites);
    localStorage.setItem('reportFavorites', JSON.stringify(favorites));
  }

  private addToHistory(entry: any): void {
    const history = this.historySubject.value;
    history.unshift({ ...entry, id: Date.now() });
    if (history.length > 50) history.pop();
    this.historySubject.next(history);
    localStorage.setItem('reportHistory', JSON.stringify(history));
  }

  private loadFavorites(): void {
    const stored = localStorage.getItem('reportFavorites');
    if (stored) {
      this.favoritesSubject.next(JSON.parse(stored));
    }
  }

  private loadHistory(): void {
    const stored = localStorage.getItem('reportHistory');
    if (stored) {
      this.historySubject.next(JSON.parse(stored));
    }
  }

  private exportToCSV(type: string, data: any): void {
    const csvContent = this.convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    this.downloadFile(blob, `${type}-report-${new Date().toISOString().split('T')[0]}.csv`);
  }

  private exportToPDF(type: string, data: any): void {
    this.pdfExport.exportToPDF(data, `${type} Report`);
  }

  private exportToExcel(type: string, data: any): void {
    this.excelExport.exportToExcel(data, `${type} Report`);
  }

  private downloadFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  private convertToCSV(data: any): string {
    if (!data.columns || !data.data) return '';
    
    const headers = data.columns.join(',');
    const rows = data.data.map((row: any[]) => row.join(',')).join('\n');
    return `${headers}\n${rows}`;
  }


}