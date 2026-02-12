import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  user!: Observable<any>;

  constructor(private authService: AuthService,
              private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // this.authService.getProfile().subscribe({
    //   next: (data) => {
    //     this.user = data;
    //   },
    //   error: (err) => {
    //     console.error('Failed to load profile', err);
    //   }
      
    // });
    this.user = this.authService.getProfile();
    this.cdr.detectChanges();
  }
}
