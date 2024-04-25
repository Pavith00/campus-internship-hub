package com.example.internshipHub.repository;

import com.example.internshipHub.model.MentorshipVideo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MentorshipVideoRepository extends MongoRepository<MentorshipVideo, String> {
    // Additional query methods if needed
}
