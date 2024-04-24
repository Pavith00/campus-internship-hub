package com.example.internshipHub.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cv")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CV {

    @Id
    private String id;
    private String fileName;
    private byte[] fileData;
    private String firstName;
    private String email;
    private String degreeProgram;
    private String shortDescription;
    private String jobTitle;
    private String companyName;


}