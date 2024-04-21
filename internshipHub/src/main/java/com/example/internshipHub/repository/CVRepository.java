package com.example.internshipHub.repository;

import com.example.internshipHub.model.CV;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CVRepository extends MongoRepository<CV, String> {
    List<CV> findByCompanyName(String companyName);
    List<CV> findByCompanyNameAndJobTitle(String companyName, String jobTitle);



}
