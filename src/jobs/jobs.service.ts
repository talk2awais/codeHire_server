import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JobEntity } from './models/jobs.entity';
import { Model } from 'mongoose';
import { JobInput } from './dto/job.input';
import { IUser } from '../common/interface/user';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobEntity.name) private readonly job: Model<JobEntity>,
  ) {}

  async getJobs() {
    return this.job.find();
  }

  async getCompanyJobs(company: IUser) {
    return this.job.find({ companyID: company.userID });
  }

  async createJob(jobInput: JobInput, company: IUser) {
    return await this.job.create({
      ...JSON.parse(jobInput.jobInfo),
      companyID: company.userID,
      id: uuidv4(),
    });
  }
}
