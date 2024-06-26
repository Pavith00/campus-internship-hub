package com.example.internshipHub.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "students")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    @Id
    private String id;


    private String fname;
    private String lname;

    private String phone;
    private String email;
    private String username;
    @Transient
    private String rawPassword;
    private String password;

    private String gender;
    private String address;

    private String university;
    private String gradOrUn; // Graduate or Undergraduate
    private int yearThatGraduate; // Year of graduation
    private String birthday;
    private String path; // Path that the student wants to pursue
    private String degree;
    private String department;
    private Map<String, Integer> quizScores;
}
