package com.example.internshipHub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mentorship_videos")
public class MentorshipVideo {
    @Id
    private String id;

    private String category;
    private String videoLink;

    // Getters and setters
}
