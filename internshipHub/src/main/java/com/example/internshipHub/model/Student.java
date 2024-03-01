package com.example.internshipHub.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "students")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    @Id
    private String id;
    private String university;
    private String gradOrUn; // Graduate or Undergraduate
    private int yearThatGraduate; // Year of graduation
    private String birthday;
    private String path; // Path that the student wants to pursue
    private String degree;
    private String department;

}
