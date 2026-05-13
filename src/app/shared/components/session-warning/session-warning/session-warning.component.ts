import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, timer } from 'rxjs';
import { SessionService } from '../../../../core/services/session.service';

@Component({
  selector: 'app-session-warning',
  templateUrl: './session-warning.component.html',
  styleUrls: ['./session-warning.component.css']
})
export class SessionWarningComponent implements OnInit, OnDestroy {
  showWarning = false;
  timeRemaining = '';
  private destroy$ = new Subject<void>();

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.sessionWarning$
      .pipe(takeUntil(this.destroy$))
      .subscribe(warning => {
        this.showWarning = warning;
        if (warning) {
          this.startCountdown();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private startCountdown(): void {
    timer(0, 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const remaining = this.sessionService.getSessionTimeRemaining();
        this.timeRemaining = this.sessionService.formatTimeRemaining(remaining);
        
        if (remaining <= 0) {
          this.showWarning = false;
        }
      });
  }

  extendSession(): void {
    this.sessionService.extendSession().subscribe({
      next: () => {
        this.showWarning = false;
        this.sessionService.dismissWarning();
      },
      error: () => {
        this.logout();
      }
    });
  }

  logout(): void {
    this.showWarning = false;
    this.sessionService.dismissWarning();
  }
}