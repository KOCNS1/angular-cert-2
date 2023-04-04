import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  constructor(@Inject('BASE_API_URL') private baseUrl: string) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      url: `${this.baseUrl}${req.url}`,
      headers: req.headers
        .append('X-RapidAPI-Key', environment.apiKey)
        .append('X-RapidAPI-Host', 'free-nba.p.rapidapi.com'),
    });
    return next.handle(clonedRequest);
  }
}
