import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { DoctorModel } from './administrator.model';
import { AdminService } from '../service/admin.service';



@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})

export class AdministratorComponent implements OnInit{
  formValue!:FormGroup;
  doctorModelObj:DoctorModel=new DoctorModel();
  doctorData:DoctorModel[]=[];
  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formbuilder:FormBuilder,
    private admin: AdminService  ){}
  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      doctorId:[''],
      doctorName:[''],
      department:['']
    })
    this.getAllDoctorDetails();
   
    
  }
  clickAddDoctor(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postDoctorDetails() {
    
    this.doctorModelObj.doctorName = this.formValue.value.doctorName;
    this.doctorModelObj.department = this.formValue.value.department;

    this.admin.postDoctor(this.doctorModelObj)
      .subscribe(
        (res) => {
          console.log(res);
          this.getAllDoctorDetails();
        },
      (error)=>{
        console.log("there is an error",error)
      });
         
  }



getAllDoctorDetails() {
  this.admin.getDoctor().subscribe((res)=>{
    console.log(res);
    this.doctorData=res;
  })
}


// deleteDoctor(row : any){
//   this.admin.deleteDoctor(row.doctorId)
//   .subscribe(res=>{
//     alert("Doctor data deleted");
//     this.getAllDoctorDetails();
//   })
  
// }

  deleteDoctor(row: DoctorModel) {
    this.admin.deleteDoctor(row.doctorId).subscribe(
      (res) => {
        alert('Doctor data deleted');
        this.getAllDoctorDetails();
      },
      (error) => {
        // Handle error appropriately
        console.error('Error deleting doctor:', error);
      }
    );
  }


onEdit(row:any){
  this.showAdd=false;
  this.showUpdate=true;
  this.doctorModelObj.doctorId=row.doctorId;
  this.formValue.controls['doctorId'].setValue(row.doctorId)
  this.formValue.controls['doctorName'].setValue(row.doctorName)
  this.formValue.controls['department'].setValue(row.department)
}
updateDoctorDetails(){
  this.doctorModelObj.doctorId = this.formValue.value.doctorId;
    this.doctorModelObj.doctorName = this.formValue.value.doctorName;
    this.doctorModelObj.department = this.formValue.value.department;
    this.admin.updateDoctor(this.doctorModelObj)
    .subscribe(
      (res)=>{
      alert("Update successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllDoctorDetails();
    })
}

  
}



