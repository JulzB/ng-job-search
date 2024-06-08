import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { JobDetails } from '../../models/job-details';
import { Observable, Subject, of, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  jobDetails$: Observable<JobDetails> = of();
  jobId: number = 0;
  jobDetails: JobDetails = new JobDetails();
  fetchingError: boolean = false;
  
  constructor(private jobService: JobService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.jobDetails$ = this.route.paramMap
      .pipe(
        takeUntil(this.ngUnsubscribe),
        switchMap(params => {
          const jobIdParam = params.get('jobId');
          this.jobId = +(jobIdParam ?? '0');
          return this.jobService.getJobById(this.jobId);
        })
      );
    
    this.jobDetails$.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (jobDetails) => this.jobDetails = jobDetails,
        error: (err) => {
          this.fetchingError = true;
          console.error(`Error getting details fob for jobId => ${this.jobId}`, err);
        },
        complete: () => this.fetchingError = false
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
