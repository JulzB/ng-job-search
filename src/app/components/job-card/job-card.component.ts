import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { RouterModule } from '@angular/router';
import { FavoriteJobService } from '../../services/favorite-job.service';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css'
})
export class JobCardComponent implements OnInit {
  @Input() isFavorite: boolean = false;
  @Input() job: Job = new Job();

  active: boolean = false;

  constructor(private favoriteJobService: FavoriteJobService) {}
  
  ngOnInit(): void {
    this.active = this.favoriteJobService.isFavoriteJob(this.job.id);
  }
  
  manageFavoriteJob(): void {
    this.active = !this.active;
    
    if (this.active) {
      this.favoriteJobService.addFavoriteJob(this.job);
    } else {
      const jobId = this.job.id;
      if (jobId) {
        this.favoriteJobService.removeFavoriteJob(jobId);
      }
    }
  }
}
