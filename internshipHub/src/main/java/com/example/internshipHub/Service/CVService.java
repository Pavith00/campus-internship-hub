package com.example.internshipHub.Service;


import com.example.internshipHub.model.CV;
import org.springframework.web.multipart.MultipartFile;

public interface CVService {

    CV storeCV(MultipartFile file);

    CV getCV(String fileName);

    void deleteCV(String fileName);

}
