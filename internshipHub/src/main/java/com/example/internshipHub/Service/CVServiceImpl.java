package com.example.internshipHub.Service;

import com.example.internshipHub.model.CV;
import com.example.internshipHub.repository.CVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CVServiceImpl implements CVService {

    @Autowired
    private CVRepository cvRepository;

    @Override
    public CV storeCV(MultipartFile file) {
        try {
            CV cv = new CV();
            cv.setFileName(file.getOriginalFilename());
            cv.setFileData(file.getBytes());
            return cvRepository.save(cv);
        } catch (Exception e) {
            throw new RuntimeException("Failed to store CV file: " + e.getMessage());
        }
    }

    @Override
    public CV getCV(String id) {
        return cvRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CV not found with id: " + id));
    }

    @Override
    public void deleteCV(String id) {
        cvRepository.deleteById(id);
    }
}
