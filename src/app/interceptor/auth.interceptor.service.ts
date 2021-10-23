import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "../service/authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      req.url.includes(`${this.authService.host}/user/login`) ||
      req.url.includes(`${this.authService.host}/user/resetPassword`) ||
      req.url.includes(`${this.authService.host}/user/register`)
    ) {
      return next.handle(req);
    } else {
      this.authService.loadToken();
      const token = this.authService.getToken();
      const reqClone = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next.handle(reqClone);
    }
  }
}
