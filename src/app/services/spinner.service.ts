import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  num:number;
  nums:number;

  constructor(private spinnerServices:NgxSpinnerService) {
    this.num=0;
    this.nums=0;
   }

  public llamarSpinner(){
    this.num++;
    this.spinnerServices.show();
  }

  public detenerSpinner(){
    this.nums++;
    if(this.nums==this.num){
      this.spinnerServices.hide();
    }

  }

}
