import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('/users');
  }

  getUserById(id: string): Observable<User> {
    return this.apiService.get<User>(`/users/${id}`);
  }

  updateUser(id: string, userData: Partial<User>): Observable<User> {
    return this.apiService.put<User>(`/users/${id}`, userData);
  }

  deleteUser(id: string): Observable<void> {
    return this.apiService.delete<void>(`/users/${id}`);
  }
}