
package com.example.internshipHub.Service;

import com.example.internshipHub.model.CV;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CVService {

    CV uploadCV(MultipartFile file, String firstName, String email, String degreeProgram, String shortDescription, String jobTitle,String companyName);

    CV downloadCV(String id);

    void deleteCV(String id);

    List<CV> getAllCVsByCompanyName(String companyName);

    List<CV> getCVsByCompanyAndJob(String companyName, String jobTitle);



}
