import { Job } from "./job";

export class JobDetails extends Job{
    location: string = '';
    industries: string[] = [];
    types: string[] = [];
    description: string = '';
    publishDate: string = '';
}