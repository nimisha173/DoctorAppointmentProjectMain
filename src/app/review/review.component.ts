import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../service/review.service';
import { Review } from './review';
import { Doctor } from './Doctor';
import { AppointmentService } from '../service/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  Id:any
  doctor:Doctor=new Doctor();
  ngOnInit(): void {
   
    this.getDoctorDetails();
  
  }
    
  constructor(
    private reviewservice: ReviewService,
    private router: Router,
    private appointmentservice: AppointmentService,
    private route:ActivatedRoute
  ) {} 
  review:Review=new Review();
  reviewDetails: Doctor[] = [];
  getDoctorDetails(): void {
     
    
    const doctorId = this.route.snapshot.paramMap.get('doctorId');

    if (doctorId !== null) {
      const parsedDoctorId = +doctorId; // Convert the doctorId to a number
      this.reviewservice.getDoctorById(parsedDoctorId).subscribe(
        (res) => {
          this.reviewDetails.push(res);
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  viewreview(){
    this.router.navigate(['/viewreview']);
  }
    
  }
  
  
  
  // saveProduct(){
  //   this.reviewservice.saveReview(this.review).subscribe((res: any)=>
  //   {
  //     console.log(res);
  //   },(error: any) => {
  //     console.log(error);
  //   });
  // }


