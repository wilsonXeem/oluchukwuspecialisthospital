import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// SessionService disabled — was causing login interference
@Injectable({ providedIn: 'root' })
export class SessionService {
  public sessionWarning$ = of(false);
  public sessionExpired$ = of(false);

  updateLastActivity(): void {}
  extendSession(): Observable<any> { return of(null); }
  dismissWarning(): void {}
  getSessionTimeRemaining(): number { return 0; }
  formatTimeRemaining(_ms: number): string { return ''; }
}
