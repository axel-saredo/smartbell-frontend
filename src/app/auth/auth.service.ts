import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { UserData } from './user-data.model';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.authUrl;
const BACKEND_API = environment.apiUrl;

@Injectable({ providedIn: 'root', })
export class AuthService {
  private isAuthenticated = false;

  private token: string;

  private user: UserData;

  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUser() {
    return this.user;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(user: UserData): Promise<any> {
    return this.http
      .post(BACKEND_URL + '/signup', user, { responseType: 'text', }).toPromise();
  }

  // TODO: Type return type
  login(email: string, password: string): Promise<any> {
    return this.http
      .post<any>(BACKEND_URL + '/login', {
        email,
        password,
      }).toPromise()
      .then((response) => {
        const token = response.token;
        this.token = token;

        if (token) {
          this.isAuthenticated = true;
          this.user = response.user;
          this.authStatusListener.next(true);
          this.saveAuthData(token);
        }
        return response.user;
      })
      .catch((
        (error) => {
          this.authStatusListener.next(false);
        }
      ));
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.user = authInformation.user;
    this.authStatusListener.next(true);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.user = null;
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (!token) {
      return;
    }
    return {
      token,
      user,
    };
  }

  // TODO: This should be in an UserService
  createProfilePicture(id: string, image: File): Promise<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'image/jpeg',
        Authorization : `Bearer ${this.token}`,
      }),
    };

    const userData = new FormData();
    userData.append('file', image, image.name);
    const URL = BACKEND_API + '/files/profile-picture/' + id;
    return this.http
      .put<any>(
        URL,
        userData,
        httpOptions
      ).toPromise();
  }
}
