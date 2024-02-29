package com.example.internshipHub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document(collection = "jobs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Job {
    @Id

    private String id;
    private String title;
    private String description;
    private List<String> requiredPaths; // Paths required for the job
}
