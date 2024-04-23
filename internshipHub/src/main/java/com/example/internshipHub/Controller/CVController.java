package com.example.internshipHub.Controller;

import com.example.internshipHub.model.CV;
import com.example.internshipHub.Service.CVService;
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


    @PostMapping("/upload")
    public ResponseEntity<CV> uploadCV(@RequestParam("file") MultipartFile file,
                                       @RequestParam("firstName") String firstName,
                                       @RequestParam("email") String email,
                                       @RequestParam("degreeProgram") String degreeProgram,
                                       @RequestParam("shortDescription") String shortDescription,
                                       @RequestParam("jobTitle") String jobTitle,
                                       @RequestParam("companyName") String companyName) {
        try {
            CV uploadedCV = cvService.uploadCV(file, firstName, email, degreeProgram, shortDescription, jobTitle, companyName);
            return ResponseEntity.status(HttpStatus.CREATED).body(uploadedCV);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

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