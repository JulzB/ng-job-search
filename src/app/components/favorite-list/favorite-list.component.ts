import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobCardComponent } from '../job-card/job-card.component';
import { CommonModule } from '@angular/common';
import { Job } from '../../models/job';
import { Subject, takeUntil } from 'rxjs';
import { FavoriteJobService } from '../../services/favorite-job.service';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [ CommonModule, JobCardComponent ],
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css'
})
export class FavoriteListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  favoriteJobs: Job[] = [];
  fetchingError: boolean = false;

  constructor(private favoriteJobService: FavoriteJobService) { }
  
  ngOnInit(): void {
    this.favoriteJobService.favoriteJobs$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(favoriteJobs => {
        this.favoriteJobs = favoriteJobs;
      });

    this.favoriteJobService.favoriteJobs$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (favoriteJobs) => this.favoriteJobs = favoriteJobs,
        error: (err) => {
          this.fetchingError = true;
          console.error('Error getting favorite Jobs', err);
        },
        complete: () => this.fetchingError = false
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
