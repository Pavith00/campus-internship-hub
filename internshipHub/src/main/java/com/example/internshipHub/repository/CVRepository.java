package com.example.internshipHub.repository;

import com.example.internshipHub.model.CV;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CVRepository extends MongoRepository<CV, String> {
}
