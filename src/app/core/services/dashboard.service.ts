import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { ApiService } from './api.service';

export interface KPIMetric {
  name: string; value: number; target: number;
  trend: 'up' | 'down' | 'stable'; percentage: number; period: string;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {

  constructor(private apiService: ApiService) {}

  getDashboardData(role: string): Observable<any> {
    return this.apiService.get(`/dashboard/${role}`).pipe(
      timeout(10000),
      map((response: any) => this.normalize(response, role)),
      catchError(() => of(this.fallback(role)))
    );
  }

  getGeneralStats(): Observable<any> {
    return this.apiService.get('/dashboard/stats').pipe(
      map((res: any) => res?.data ?? res),
      catchError(() => of({}))
    );
  }

  getKPIMetrics(role: string): Observable<KPIMetric[]> {
    return this.apiService.get<any>(`/dashboard/kpi/${role}`).pipe(
      map((res: any) => res?.data ?? []),
      catchError(() => of([]))
    );
  }

  getTrendAnalysis(metric: string): Observable<any> {
    return this.apiService.get(`/dashboard/trends/${metric}`).pipe(
      map((res: any) => res?.data ?? {}),
      catchError(() => of({}))
    );
  }

  getPerformanceMetrics(): Observable<any> {
    return this.apiService.get('/dashboard/performance').pipe(
      map((res: any) => res?.data ?? {}),
      catchError(() => of({}))
    );
  }

  refreshDashboard(): void {}

  private normalize(response: any, role: string): any {
    const data       = response?.data ?? response ?? {};
    const stats      = data.stats      ?? {};
    const quickStats = data.quickStats ?? {};
    const recentAct  = data.recentActivity ?? {};

    const out: any = {
      ...data, ...stats, ...quickStats,
      recentActivities: data.recentActivities ?? recentAct.recentActivities ?? recentAct.recentAppointments ?? [],
      monthlyRevenue:   this.toSeries(data.revenueData, 'revenue'),
      weeklyConsultations: this.toSeries(data.appointmentTrends, 'count'),
      inventoryStatus: data.inventoryStatus
        ? [data.inventoryStatus.inStock || 0, data.inventoryStatus.lowStock || 0, data.inventoryStatus.outOfStock || 0]
        : undefined
    };

    if (role === 'receptionist') {
      out.todayRegistrations = out.todayRegistrations ?? out.totalPatients ?? 0;
      out.appointmentsToday  = out.appointmentsToday  ?? out.todayAppointments ?? 0;
      out.pendingPayments    = out.pendingPayments    ?? 0;
    }
    return out;
  }

  private toSeries(rows: any[] | undefined, field: string): number[] | undefined {
    if (!Array.isArray(rows)) return undefined;
    return rows.map(r => Number(r?.[field] ?? 0));
  }

  private fallback(role: string): any {
    const base = { recentActivities: [], notifications: [], monthlyRevenue: [], weeklyConsultations: [] };
    if (role === 'receptionist') return { ...base, todayRegistrations: 0, pendingPayments: 0, appointmentsToday: 0 };
    return base;
  }
}
