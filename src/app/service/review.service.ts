import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../review/review';
import { Observable } from 'rxjs';
import { Doctor } from '../review/Doctor';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  saveReview(review: Review) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  getDoctorById(doctorId: number): Observable<Doctor> {
    return this.http.get<any>(`http://localhost:8000/admin/find/${doctorId}`);
}
}