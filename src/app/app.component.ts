import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormArray, Validators,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loginForm: FormGroup;

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, [Validators.required, Validators.maxLength(8)]],
      phonenumber: [null],
      notification: ['email']
  });

  this.formControlValueChanged();
  }

  constructor(private fb: FormBuilder){

  }

  loginUser() {
    console.log(this.loginForm.status);
    console.log(this.loginForm.value);
  }
  
  formControlValueChanged(){
    const phoneControl = this.loginForm.get('phonenumber');
    this.loginForm.get('notification').valueChanges.subscribe((mode:string)=>{
      console.log(mode);
      if(mode === 'phone'){
        phoneControl.setValidators([Validators.required])
      }
      else if (mode==='email'){
        phoneControl.clearValidators();
      }
      phoneControl.updateValueAndValidity();
    });
  }
}
