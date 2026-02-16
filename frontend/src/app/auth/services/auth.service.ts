import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment.prod";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/login`,
      data,
      { withCredentials: true }   // ⭐ REQUIRED
    ).pipe(
      tap(res => {
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('role', res.role);
      })
    );
  }

  signup(data: any) {
    return this.http.post(`${environment.apiUrl}/auth/register`, data);
  }

  isLoggedIn() {
    console.log(!!sessionStorage.getItem('token'));
    console.log(sessionStorage);

    return !!sessionStorage.getItem('token');
  }

  logout() {
    sessionStorage.clear();
  }

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  getProfile(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/profile`);
  }

  // refreshToken() {
  //   // const refreshToken = sessionStorage.getItem('refreshToken');
  //   // console.log("refreshToken ", refreshToken);

  //   return this.http.post<any>(`${environment.apiUrl}/refresh`,
  //      {},
  //      {withCredentials: true}).pipe(
  //     tap(res => {
  //       sessionStorage.setItem('token', res.token);
  //       if (res.refreshToken) {
  //       sessionStorage.setItem('refreshToken', res.refreshToken);
  //     }
  //       console.log("Camer here ", sessionStorage);

  //     })
  //   );
  // }


  refreshToken() {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/refresh`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(res => {
        sessionStorage.setItem('token', res.token);
      })
    );
  }
}
