import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { User } from "../model/user";
import { CustomHttpResponse } from "../model/custom-http-response";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  private host = environment.apiUrl;

  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[] | HttpErrorResponse>(
      `${this.host}/user/find/all`
    );
  }

  public addUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>(
      `${this.host}/user/add`,
      formData
    );
  }

  public updateUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.put<User | HttpErrorResponse>(
      `${this.host}/user/update`,
      formData
    );
  }

  public resetPassword(
    email: string
  ): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.get<CustomHttpResponse | HttpErrorResponse>(
      `${this.host}/user/resetPassword/${email}`
    );
  }

  public updateProfileImage(
    formData: FormData
  ): Observable<HttpEvent<any> | HttpErrorResponse> {
    return this.http.put<any>(
      `${this.host}/user/updateProfileImage`,
      formData,
      { reportProgress: true, observe: "body" }
    );
  }

  public deleteUser(
    userId: number
  ): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse | HttpErrorResponse>(
      `${this.host}/user/delete/${userId}`
    );
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem("users", JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] {
    if (localStorage.getItem("users")) {
      return JSON.parse(localStorage.getItem("users"));
    }
    return null;
  }

  public createUserFormData(
    loggedInUsername: string,
    user: User,
    profileImage: File
  ): FormData {
    const formData = new FormData();
    formData.append("currentUsername", loggedInUsername);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("role", user.role);
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("profileImage", profileImage);
    /*formData.append("lastLoginDate", JSON.stringify(user.lastLoginDate));
    formData.append(
      "lastLoginDateDisplay",
      JSON.stringify(user.lastLoginDateDisplay)
    );
    formData.append("signUpDate", JSON.stringify(user.signUpDate));*/
    formData.append("authorities", JSON.stringify(user.authorities));
    formData.append("isActive", JSON.stringify(user.isActive));
    formData.append("isNotLocked", JSON.stringify(user.isNotLocked));
    return formData;
  }
}
