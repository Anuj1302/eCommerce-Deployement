import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrl: '/signup.css',
  imports: [CommonModule, ReactiveFormsModule]
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  step = 1;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      // Step 1
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

      // Step 2
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    });
  }

  next() {
    console.log("Camer her");
    
    if (this.step === 1 && this.isStep1Valid()) {
      console.log("Camer her in nexr");
      
      this.step = 2;
    }
  }

  back() {
    this.step = 1;
  }

  signup() {
    if (
      this.signupForm.value.password !==
      this.signupForm.value.confirmPassword
    ) {
      alert('Passwords do not match');
      return;
    }
    console.log(this.signupForm.invalid);
    if (this.signupForm.invalid) return;
    console.log("camer her in formdata ", this.signupForm);
    
    const formData = this.signupForm.value;
    delete formData.confirmPassword;

    this.authService.signup(formData).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  private isStep1Valid(): boolean {
    const controls = this.signupForm.controls;
    return (
      controls['firstName'].valid &&
      controls['lastName'].valid &&
      controls['dob'].valid &&
      controls['email'].valid &&
      controls['phone'].valid
    );
  }
}
