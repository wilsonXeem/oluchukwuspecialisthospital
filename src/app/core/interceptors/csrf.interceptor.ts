import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  private readonly CSRF_HEADER = 'X-CSRF-Token';
  private readonly CSRF_COOKIE = 'XSRF-TOKEN';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.shouldAddCsrfToken(req)) {
      const csrfToken = this.getCsrfToken();
      if (csrfToken) {
        req = req.clone({
          setHeaders: {
            [this.CSRF_HEADER]: csrfToken,
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
      }
    }
    return next.handle(req);
  }

  private shouldAddCsrfToken(req: HttpRequest<any>): boolean {
    const isSameOrigin = this.isSameOrigin(req.url);
    const isStateChanging = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method.toUpperCase());
    return isSameOrigin && isStateChanging;
  }

  private getCsrfToken(): string | null {
    let token = this.getTokenFromMeta();
    if (!token) {
      token = this.getTokenFromCookie();
    }
    return token;
  }

  private getTokenFromMeta(): string | null {
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    return metaTag ? metaTag.getAttribute('content') : null;
  }

  private getTokenFromCookie(): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === this.CSRF_COOKIE) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  private isSameOrigin(url: string): boolean {
    if (url.startsWith('/')) return true;
    try {
      const requestUrl = new URL(url);
      return requestUrl.origin === window.location.origin;
    } catch {
      return false;
    }
  }
}