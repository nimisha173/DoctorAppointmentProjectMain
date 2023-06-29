import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { FormBuilder } from "@angular/forms";
import { appointmententity } from './appointmententity';
import { AppointmentserviceService } from '../service/appointmentservice.service';
import { doctorentity } from './doctorentity';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReviewService } from '../service/review.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],

})
export class AppointmentComponent implements OnInit{
  myform!: FormGroup;
  mydropdown!:FormGroup;
  entity: appointmententity = new appointmententity();
 
  doctor: doctorentity=new doctorentity();
  doctorData:doctorentity[]=[];
  dId:any;
  sdepartment:any;
  sdoctor:string='' ;
  restId:number=0;
  doctors=[];
  ndoctor:doctorentity[]=[];
  appointmentDate: any;
  data=[];
  parent:any;

  
  constructor(
    private formbuilder: FormBuilder,
    private appointmentservice: AppointmentserviceService,
    private route: ActivatedRoute,
    private router:Router,
    private reviewservice:ReviewService
  ) {}

  ngOnInit(): void {
    this.myform = this.formbuilder.group({
      appointmentId: [''],
      userName: [''],
      userId: [''],
      doctorName: [''],
      details: [''],
      appointmentDate: ['All'],
      appointmentTime: [''],
      department: [''],
      doctorId:['']
    });
    this.getAlldoctor();
    this.mydropdown= this.formbuilder.group({
       doctorId:[''],
       doctorName:[''],
       
     
      department: ['All']
      

    });
    
  }

 

    //  This method help in capturing the doctorName and doctorId ,which will be displayed automatically to the registration page. 
  doctorDetails(doctor:doctorentity){
    this.myform.patchValue({
      doctorName: doctor.doctorName,
      department: doctor.department,
      doctorId: doctor.doctorId
     
      
    });
    console.log(doctor.doctorName);
    this.parent=doctor.doctorId;
  }
  // This method helps in posting the appointmnet to appointmnet entity.
  postAppointment() {
    this.entity.userName = this.myform.value.userName;
    this.entity.userId = this.myform.value.userId;
    this.entity.details = this.myform.value.details;

    const selectedTime = this.myform.value.appointmentTime;
    console.log("My time slot is"+ selectedTime);
    this.entity.appointmentDate = this.myform.value.appointmentDate;
    this.entity.appointmentTime = this.myform.value.appointmentTime;
    // This work for the dropdown where the vale selected will be displayed.
    const selectedDepartment = this.mydropdown.value.department;
    console.log("MY DEPT IS" + selectedDepartment );
   

    const selectedDoctor = this.doctorData.find(doc => doc.doctorName === this.myform.value.doctorName);
  if (selectedDoctor) {
    this.entity.doctorName = selectedDoctor.doctorName;
    this.entity.department = selectedDoctor.department;
    this.entity.doctorId = selectedDoctor.doctorId;

  }
  
    // this is used to sedn an alert MessageChannel.
    this.appointmentservice.saveAppointment(this.entity)
    .subscribe(
      (res: any) => {
        console.log(res);
        this.doctorData.push(res);
        alert('Appointment Booked');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.myform.reset();
      },
      (err: any) => {
        console.error(err);
        alert('Something went wrong');
      }
    );
   
  }
  searchdoc() {
    // if(this.sdoctor!='default' && this.sdepartment!='')
    // {
    //   this.getbyDoctorsNameDepartment(this.sdoctor,this.sdepartment);
    //   console.log(this.sdepartment,this.sdoctor);
    // }
    this.doctorData=[];
     if(this.sdoctor==='' && this.sdepartment!='')
    {
      
      this.getByDoctorDepartment(this.sdepartment);
    }
    else{
      this.getByDoctorName(this.sdoctor);
    }
  }
  
  
  // getAlldoctor() {
    
  //   this.appointmentservice.getdoctor().subscribe(data => {
  //     // Remove duplicates from the data array based on doctorId
  //     this.doctorData = data.filter((doctor: { doctorName: any; }, index: any, self: { doctorName: any; }[]) => {
  //       return index === self.findIndex((d: { doctorName: any; }) => d.doctorName === doctor.doctorName);
  //     });
  
  //     console.log(this.doctorData);
  //   });
  // }

  
  getAlldoctor() {
    this.appointmentservice.getdoctor().subscribe(data => {
      // Remove duplicates from the data array based on doctorName and department
      this.doctorData = this.removeDuplicates(data, 'doctorId');
      // this.doctorData = this.removeDuplicates(data, 'department');
  
      console.log(this.doctorData);
    });
  }
  // This method helps in retriving the list of doctor from the selected dpartment using the dropdown.
  getByDoctorDepartment(dept:string):void{
    
    this.appointmentservice.getDoctorByDepartment(dept).subscribe((res)=>{
      
      
      this.doctorData=res;
    },
    (error)=>{
      if(error.status === 400){
        alert('No doctor found');
      }
      console.log("Error Cannot retrieve:",error);
    }
    );
    
  }

  // getbyDoctorsNameDepartment(dname:string,docdept:string){

  // this.appointmentservice.getDoctorByNameDepartment(dname,docdept).subscribe((res)=>{
  //   console.log(res);
  //   this.ndoctor=[];
  //   this.data=res;
  //   for(let  i=0;i<this.data.length;i++){
  //     this.doctor=new doctorentity();
  //     this.doctor.doctorId=this.data[i]['doctorId'];
  //     this.doctor.doctorName=this.data[i]['doctorName'];
  //     this.doctor.department=this.data[i]['department'];
  //     this.ndoctor.push(this.doctor);
  //   }

  // },
  // error => {
  //   if (error.status === 404) {
  //     alert('No Doctors Found');
  //     window.location.reload();
  //   } else {
  //     // Handle other error cases here
  //   }
  // });
  
  // }
 


  // This method is used to get the list of doctor corresponding to the entered doctor name.

  getByDoctorName(name:string){
    this.appointmentservice.getDoctorsByName(name).subscribe((res)=>{
      console.log(res)
      this.data=res;
      this.doctorData.push(res);
    },
    (error)=>{
      if(error.status===400){
        alert('No Doctors Found');
        window.location.reload();

      }
      console.log("Error in retrieving names:",error);
    }
    );
  }



  //This method is for removing the duplicate doctorId.this is called in the postappointmnet function.
  removeDuplicates(array: any[], key: string) {
    return array.filter((obj, index, self) =>
      index === self.findIndex((el) => el[key] === obj[key])
    );
  }
  // //This work for the dropdown of the department
  // onDepartmentChange(value: string) {
  //   // Assign the selected value to the corresponding form control
  //   this.mydropdown.get('department')?.setValue(value);
   
  // }
  //This work to get the appointment Time from the drop down.
  onAppointmentTime(value:string){
    this.myform.get('appointmentTime')?.setValue(value);
  }
  viewProfile(doctorId: number) {
    
    this.router.navigate(['/review', doctorId]);
  }
 

}
  
  