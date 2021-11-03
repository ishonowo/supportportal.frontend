import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
  }

  ngOnDestroy(): void {}
}
