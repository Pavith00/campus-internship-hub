package com.example.internshipHub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "jobs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Job {
    @Id
    private String id;
    private String company;
    private String title;
    private String description;
    private String skills;
    private String path; // Path related to this job (e.g., IT, Marketing, etc.)
    private String location;
    // Getters and setters
}
