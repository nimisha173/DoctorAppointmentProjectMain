import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appointment } from '../review/appointment';
import { Doctor } from '../review/Doctor';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8300/review';
  constructor(private http: HttpClient) {}

  appointments:appointment=new appointment();

  // private apiUrl = 'http://localhost:8200/appointment/findaps';

  

  getAppointment(appointmentId: number): Observable<appointment> {
    return this.http.get<appointment>(`http://localhost:8200/appointment/find/${appointmentId}`);
  }
  id:number=1;
  getDoctor(id:number):Observable<Doctor>
  {
    return this.http.get<Doctor>(`http://localhost:8000/admin/find/${id}`);
  }
}
