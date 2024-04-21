package com.example.internshipHub.model;


import lombok.AllArgsConstructor;
import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "videos")

@Data
@AllArgsConstructor
public class Video {
    @Id
    private String id;

    private String category;
    private String videoLink;

    // Getters and setters
}


