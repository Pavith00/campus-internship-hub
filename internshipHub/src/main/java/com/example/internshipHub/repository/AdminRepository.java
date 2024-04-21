package com.example.internshipHub.repository;

import com.example.internshipHub.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
    Admin findByUsername(String username);

    boolean existsByUsername(String username);

    String deleteByUsername(String username);
}
