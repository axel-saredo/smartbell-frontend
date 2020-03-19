import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { UserData } from "./user-data.model";

import { environment } from "../../environments/environment";

const BACKEND_URL = environment.authUrl;

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(user: UserData) {
    const userData: UserData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      coachData: {
        displayName: user.coachData.displayName
      }
    };
    return this.http
      .post(BACKEND_URL + "/signup", userData, { responseType: "text" })
      .subscribe(
        () => {
          this.router.navigate(["/auth/login"]);
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  login(email: string, password: string) {
    this.http
      .post<{ token: string; userId: string }>(BACKEND_URL + "/login", {
        email: email,
        password: password
      })
      .subscribe(
        response => {
          const token = response.token;
          this.token = token;
          if (token) {
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);

            this.saveAuthData(token, this.userId);

            // TODO: Redirect user to home after logged in.

            // this.router.navigate(["/"]);
            console.log("LOGIN WORKED");
          }
        },
        error => {
          console.log(error);
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.userId = authInformation.userId;
    this.authStatusListener.next(true);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(["/"]);
  }

  private saveAuthData(token: string, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token) {
      return;
    }
    return {
      token: token,
      userId: userId
    };
  }
}
