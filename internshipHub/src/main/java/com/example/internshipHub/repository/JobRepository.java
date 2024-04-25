package com.example.internshipHub.repository;


import com.example.internshipHub.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends MongoRepository<Job, String>{
    /*
    List<Student> findByLnameAndFname(String , String );//entityname,primarykeydatatype
     */
//    String deleteByID(studentId);
//    String deleteByfname(studentId);



    Job findByTitle(String title);

    boolean existsByTitle(String title);

    long deleteByTitle(String title);

    List<Job> findByPath(String path);

    boolean existsByTitleAndCompany(String title, String company);


    List<Job> findByLocation(String location);

    List<Job> findByTitleContainingIgnoreCaseOrLocationContainingIgnoreCase(String query, String query1);


    Job findByIndustryIgnoreCase(String name);


    List<Job> findByCompany(String company);
}

