import { Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';

export const routes: Routes = [
  { path: 'job-list', component: JobListComponent },
  { path: 'favorite-list', component: FavoriteListComponent },
  { path: 'job-list/job-details/:jobId', component: JobDetailsComponent },
  { path: 'favorite-list/job-details/:jobId', component: JobDetailsComponent },
  { path: '', redirectTo: '/job-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/job-list' }
];