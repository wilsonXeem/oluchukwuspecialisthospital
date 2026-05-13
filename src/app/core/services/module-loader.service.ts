import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleLoaderService {
  private enabledModules: string[] = [];

  constructor(private api: ApiService, private router: Router) {}

  async loadUserModules(): Promise<void> {
    const response = await this.api.get('/modules/enabled').toPromise();
    this.enabledModules = response.modules;
    this.updateRoutes();
  }

  isModuleEnabled(module: string): boolean {
    return this.enabledModules.includes(module);
  }

  private updateRoutes(): void {
    const routes = this.router.config;
    routes.forEach(route => {
      if (route.data?.['module'] && !this.isModuleEnabled(route.data['module'])) {
        route.canActivate = [() => false];
      }
    });
  }
}