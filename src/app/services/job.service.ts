import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/job';
import { JobDetails } from '../models/job-details';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = '/jobs';

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobById(jobId: number): Observable<JobDetails> {
    return this.http.get<JobDetails>(`${this.apiUrl}/${jobId}`);
  }
}
