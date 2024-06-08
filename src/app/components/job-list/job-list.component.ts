import { Component, OnDestroy, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { Subject, takeUntil } from 'rxjs';
import { JobCardComponent } from '../job-card/job-card.component';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [ CommonModule, JobCardComponent ],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  fetchingError: boolean = false;
  jobs: Job[] = [];

  constructor(private jobService: JobService){}
 
  ngOnInit() {
    this.jobService.getAllJobs()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (jobs) => this.jobs = jobs,
        error: (err) => { 
          this.fetchingError = true;
          console.error('Error fetching jobs:', err);
        },
        complete: () => this.fetchingError = false
      }
      );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
