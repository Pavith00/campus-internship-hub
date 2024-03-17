package com.example.internshipHub.Controller;

import com.example.internshipHub.model.CV;
import com.example.internshipHub.Service.CVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/cv")
public class CVController {

    @Autowired
    private CVService cvService;

    @PostMapping("/upload")
    public ResponseEntity<CV> uploadCV(@RequestParam("file") MultipartFile file) {
        CV cv = cvService.storeCV(file);
        return new ResponseEntity<>(cv, HttpStatus.CREATED);
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<byte[]> getCV(@PathVariable String fileName) {
        CV cv = cvService.getCV(fileName);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=" + cv.getFileName())
                .body(cv.getFileData());
    }

    @DeleteMapping("/{fileName}")
    public ResponseEntity<Void> deleteCV(@PathVariable String fileName) {
        cvService.deleteCV(fileName);
        return ResponseEntity.noContent().build();
    }
}

