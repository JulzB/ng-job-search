import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class FavoriteJobService {
  private favoriteJobsSubject = new BehaviorSubject<Job[]>(this.getFavoriteJobs());
  favoriteJobs$ = this.favoriteJobsSubject.asObservable();

  constructor() { }

  getFavoriteJobs(): Job[] {
    return JSON.parse(localStorage.getItem('favoriteJobs') || '[]');
  }

  addFavoriteJob(job: Job): void {
    const favoriteJobs = this.getFavoriteJobs();
    const favoriteJobExists = favoriteJobs.some(favoriteJob => favoriteJob.id === job.id);

    if (!favoriteJobExists) {
      favoriteJobs.push(job);
      localStorage.setItem('favoriteJobs', JSON.stringify(favoriteJobs));
      this.favoriteJobsSubject.next(favoriteJobs);
    }
  }

  isFavoriteJob(jobId: number): boolean {
    const favoriteJobs = this.getFavoriteJobs();
    return favoriteJobs.some(favoriteJob => favoriteJob.id === jobId);
  }

  removeFavoriteJob(jobId: number): void {
    const favoriteJobs = this.getFavoriteJobs();
    const index = favoriteJobs.findIndex(favoriteJob => favoriteJob.id === jobId);

    if( index > -1) {
      favoriteJobs.splice(index, 1);
      localStorage.setItem('favoriteJobs', JSON.stringify(favoriteJobs));
      this.favoriteJobsSubject.next(favoriteJobs);
    }
  }

}