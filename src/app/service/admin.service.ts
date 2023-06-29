import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DoctorModel } from '../administrator/administrator.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  

  constructor(private http:HttpClient) { }

  postDoctor(data:DoctorModel):Observable<Object>{
    return this.http.post('http://localhost:8000/admin',data)
   
  }

  getDoctor(){
    return this.http.get<DoctorModel[]>("http://localhost:8000/admin/findall")
  }
    
    
    


updateDoctor(data:DoctorModel):Observable<Object>{
  return this.http.put(`http://localhost:8000/admin`,data)
  
  
 
}


deleteDoctor(doctorId: number) {
  return this.http.delete(`http://localhost:8000/admin/${doctorId}`)
    
   
}

}




