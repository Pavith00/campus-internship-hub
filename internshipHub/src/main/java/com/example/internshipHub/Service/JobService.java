//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.example.internshipHub.Service;

import com.example.internshipHub.exception.ServiceException;
import com.example.internshipHub.model.Job;
import com.example.internshipHub.repository.CVRepository;
import com.example.internshipHub.repository.JobRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobService {
    @Autowired
    private JobRepository repository;
    @Autowired
    private CVRepository cvRepository;

    public JobService() {
    }

    public List<Job> getAllJobs() {
        try {
            return this.repository.findAll();
        } catch (Exception var2) {
            throw new ServiceException("Error occurred while fetching users", var2);
        }
    }

    public Job getJob(String name) {
        try {
            return this.repository.findByTitle(name);
        } catch (Exception var3) {
            throw new ServiceException("Error occurred while fetching specific user", var3);
        }
    }

    public Job getJobByIndustry(String name) {
        try {
            return this.repository.findByIndustryIgnoreCase(name);
        } catch (Exception var3) {
            throw new ServiceException("Error occurred while fetching job by industry", var3);
        }
    }

    public String addJob(Job job) {
        try {
            if (!this.repository.existsByTitle(job.getTitle().trim())) {
                this.repository.save(job);
                return "User " + job.getTitle() + " Saved Successfully";
            } else {
                return "Username " + job.getTitle() + " Already Exists";
            }
        } catch (Exception var3) {
            throw new ServiceException("Error occurred while adding a user", var3);
        }
    }

    public String updateJob(Job jobRequest) {
        try {
            if (this.repository.existsByTitle(jobRequest.getTitle())) {
                Job existingJob = this.repository.findByTitle(jobRequest.getTitle());
                if (jobRequest.getDescription() != null) {
                    existingJob.setDescription(jobRequest.getDescription());
                }

                return "Job " + jobRequest.getTitle() + " Updated successfully";
            } else {
                return "Job " + jobRequest.getTitle() + " Does not Exist";
            }
        } catch (Exception var3) {
            throw new ServiceException("Error occurred while updating a user", var3);
        }
    }

    public String deleteJob(String title) {
        try {
            if (this.repository.existsByTitle(title)) {
                this.repository.deleteByTitle(title);
                return title + " User Deleted Successfully";
            } else {
                return title + " User Does not exists";
            }
        } catch (Exception var3) {
            throw new ServiceException("Error Occurred while Deleting User", var3);
        }
    }

    public List<Job> getJobsByLocation(String location) {
        try {
            return this.repository.findByLocation(location);
        } catch (Exception var3) {
            throw new ServiceException("Error occurred while fetching jobs by location", var3);
        }
    }

    public List<Job> searchJobs(String query) {
        try {
            return this.repository.findByTitleContainingIgnoreCaseOrLocationContainingIgnoreCase(query, query);
        } catch (Exception var3) {
            throw new ServiceException("Error occurred while searching jobs", var3);
        }
    }

    public List<Job> getJobsByCompany(String company) {
        try {
            return this.repository.findByCompany(company);
        } catch (Exception var3) {
            throw new ServiceException("Error occurred while fetching jobs by company", var3);
        }
    }
}
