
package com.example.internshipHub.Service;

import com.example.internshipHub.model.CV;
import com.example.internshipHub.repository.CVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class CVServiceImpl implements CVService {

    @Autowired
    private CVRepository cvRepository;



    @Override
    public CV uploadCV(MultipartFile file, String firstName, String email, String degreeProgram, String shortDescription, String jobTitle, String companyName) {
        try {
            CV cv = new CV();
            cv.setFileName(file.getOriginalFilename());
            cv.setFileData(file.getBytes());
            cv.setFirstName(firstName);
            cv.setEmail(email);
            cv.setDegreeProgram(degreeProgram);
            cv.setShortDescription(shortDescription);
            cv.setJobTitle(jobTitle);
            cv.setCompanyName(companyName);
            return cvRepository.save(cv);
        } catch (Exception e) {
            throw new RuntimeException("Failed to store CV file: " + e.getMessage());
        }
    }

    @Override
    public CV downloadCV(String id) {
        return cvRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CV not found with id: " + id));
    }

    @Override
    public void deleteCV(String id) {
        cvRepository.deleteById(id);
    }

    public List<CV> getAllCVsByCompanyName(String companyName) {
        return cvRepository.findByCompanyName(companyName);
    }

    public List<CV> getCVsByCompanyAndJob(String companyName, String jobTitle) {
        return cvRepository.findByCompanyNameAndJobTitle(companyName, jobTitle);
    }



}
