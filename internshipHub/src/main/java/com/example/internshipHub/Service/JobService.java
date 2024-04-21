package com.example.internshipHub.Service;

import com.example.internshipHub.exception.ServiceException;
import com.example.internshipHub.model.CV;
import com.example.internshipHub.model.Job;
import com.example.internshipHub.repository.CVRepository;
import com.example.internshipHub.repository.JobRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    @Autowired
    private JobRepository repository;

    @Autowired
    private CVRepository cvRepository;

    // Existing methods...



    public List<Job> getAllJobs(){
        try {
            return repository.findAll();
        } catch (Exception e) {
            throw new ServiceException("Error occurred while fetching users", e);
        }
    }

    public Job getJob(String name){
        try{
            return repository.findByTitle(name);
        } catch (Exception e){
            throw new ServiceException("Error occurred while fetching specific user", e);
        }
    }

    public Job getJobByIndustry(String name){
        try{
            return repository.findByIndustryIgnoreCase(name);
        } catch (Exception e){
            throw new ServiceException("Error occurred while fetching job by industry", e);
        }
    }

    public  String addJob(Job job){
        try {
            if(!repository.existsByTitle(job.getTitle().trim())) {

                repository.save(job);
                return "User " + job.getTitle() + " Saved Successfully";
            }
            else {
                return "Username " + job.getTitle() + " Already Exists";
            }

        } catch (Exception e) {
            throw new ServiceException("Error occurred while adding a user", e);
        }
    }

    //TODO: Not Updating
    //TODO: Remove Password updaing in update profile and introduce another
    public String updateJob(Job jobRequest){
        try {
            if (repository.existsByTitle(jobRequest.getTitle())) {
                Job existingJob = repository.findByTitle(jobRequest.getTitle());
                if(jobRequest.getDescription() != null) {
                    existingJob.setDescription(jobRequest.getDescription());
                }

                return "Job " + jobRequest.getTitle() + " Updated successfully";
            } else {
                return "Job " +jobRequest.getTitle() + " Does not Exist";
            }
        } catch (Exception e){
            throw new ServiceException("Error occurred while updating a user", e);
        }
    }

    public String deleteJob(String title){
        try {
            if(repository.existsByTitle(title)) {
                repository.deleteByTitle(title);
                return title + " User Deleted Successfully";
            }
            else{
                return title + " User Does not exists";
            }
        } catch (Exception e){
            throw new ServiceException("Error Occurred while Deleting User", e);
        }
    }
    public List<Job> getJobsByLocation(String location) {
        try {
            return repository.findByLocation(location);
        } catch (Exception e) {
            throw new ServiceException("Error occurred while fetching jobs by location", e);
        }
    }

    public List<Job> searchJobs(String query) {
        try {
            // Search by title or location
            return repository.findByTitleContainingIgnoreCaseOrLocationContainingIgnoreCase(query, query);
        } catch (Exception e) {
            throw new ServiceException("Error occurred while searching jobs", e);
        }
    }

    public List<Job> getJobsByCompany(String company) {
        try {
            return repository.findByCompany(company);
        } catch (Exception e) {
            throw new ServiceException("Error occurred while fetching jobs by company", e);
        }
    }


}
