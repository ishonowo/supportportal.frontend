import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NotificationType } from "../enum/notification.type.enum";
import { HeaderType } from "../enum/header.type.enum";
import { User } from "../model/user";
import { AuthenticationService } from "../service/authentication.service";
import { NotificationService } from "../service/notification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl("/user/management");
    } else {
      this.router.navigateByUrl("/login");
    }
  }

  public onLogin(user: User): void {
    this.showLoading = true;
    console.log(user);
    this.subscriptions.push(
      this.authService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          console.log(response);
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authService.saveToken(token);
          this.authService.addUserToLocalCache(response.body);
          this.router.navigateByUrl("/user/management");
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.sendErrorNotification(
            NotificationType.ERROR,
            errorResponse.error.message
          );
          this.showLoading = false;
        }
      )
    );
  }

  private sendErrorNotification(
    notiType: NotificationType,
    message: string
  ): void {
    if (message) {
      this.notifyService.notify(notiType, message);
    } else {
      this.notifyService.notify(
        notiType,
        "An error has occurred. Kindly try again."
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
