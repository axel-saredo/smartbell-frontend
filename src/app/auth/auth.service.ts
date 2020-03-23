import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { UserData } from "./user-data.model";

import { environment } from "../../environments/environment";

const BACKEND_URL = environment.authUrl;
const BACKEND_API = environment.apiUrl;

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
    debugger;
    return this.http
      .post(BACKEND_URL + "/signup", user, { responseType: "text" })
      .subscribe(
        () => {
          this.login(user.email, user.password, user.image);
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  login(email: string, password: string, image?: File) {
    this.http
      .post<any>(BACKEND_URL + "/login", {
        email,
        password
      })
      .subscribe(
        response => {
          const token = response.token;
          this.token = token;

          if (token) {
            this.isAuthenticated = true;
            this.userId = response.user.id;
            this.authStatusListener.next(true);

            this.saveAuthData(token, this.userId);

            const httpOptions = {
              headers: new HttpHeaders({
                "Content-Type": "image/jpeg",
                Authorization: `Bearer ${token}`
              })
            };

            const userData = new FormData();
            userData.append("file", image, image.name);

            this.http
              .put<any>(
                BACKEND_API + "/files/profile-picture/" + this.userId,
                userData,
                httpOptions
              )
              .subscribe(response => console.log("It worked!"));

            this.router.navigate(["/"]);
          }
        },
        error => {
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
      token,
      userId
    };
  }
}
