package com.example.internshipHub.repository;

import com.example.internshipHub.model.Company;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends MongoRepository<Company, String> {
    Company findByUsername(String username);

    boolean existsByUsername(String username);

    String deleteByUsername(String username);
}