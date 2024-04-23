package com.example.internshipHub.Controller;

import com.example.internshipHub.Service.CompanyService;
import com.example.internshipHub.Service.EmailService;
import com.example.internshipHub.model.CV;
import com.example.internshipHub.Service.CVService;
import com.example.internshipHub.model.Company;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/cv")
public class CVController {

    @Autowired
    private CVService cvService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private EmailService emailService; // Inject the email service

    @PostMapping("/upload")
    public ResponseEntity<CV> uploadCV(@RequestParam("file") MultipartFile file,
                                       @RequestParam("firstName") String firstName,
                                       @RequestParam("studentEmail") String studentEmail,
                                       @RequestParam("degreeProgram") String degreeProgram,
                                       @RequestParam("shortDescription") String shortDescription,
                                       @RequestParam("jobTitle") String jobTitle,
                                       @RequestParam("companyName") String companyName) {
        try {
            // Upload CV
            CV uploadedCV = cvService.uploadCV(file, firstName, studentEmail, degreeProgram, shortDescription, jobTitle, companyName);

            // Retrieve company email dynamically
            Company company = companyService.getCompanyByName(companyName);
            if (company != null) {
                String companyEmail = company.getEmail();

                // Send email notification to the company
                String subject = "New CV Uploaded";
                String message = "A new CV has been uploaded by " + firstName + ". Please log in to view the CV.";
                emailService.sendEmail(companyEmail, subject, message, studentEmail); // Set studentEmail as reply-to address

                return ResponseEntity.status(HttpStatus.CREATED).body(uploadedCV);
            } else {
                // Company not found
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    // Other methods remain unchanged



    @GetMapping("/{id}")
    public ResponseEntity<byte[]> downloadCV(@PathVariable String id) {
        try {
            CV cv = cvService.downloadCV(id);
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"" + cv.getFileName() + "\"")
                    .body(cv.getFileData());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/company/{companyName}")
    public ResponseEntity<List<CV>> getAllCVsByCompanyName(@PathVariable String companyName) {
        try {
            List<CV> cvs = cvService.getAllCVsByCompanyName(companyName);
            return ResponseEntity.ok(cvs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/company/{companyName}/job/{jobTitle}")
    public ResponseEntity<List<CV>> getCVsByCompanyAndJob(@PathVariable String companyName, @PathVariable String jobTitle) {
        try {
            List<CV> cvs = cvService.getCVsByCompanyAndJob(companyName, jobTitle);
            return ResponseEntity.ok(cvs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCV(@PathVariable String id) {
        try {
            cvService.deleteCV(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}