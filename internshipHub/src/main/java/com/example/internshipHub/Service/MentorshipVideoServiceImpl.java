package com.example.internshipHub.Service;

import com.example.internshipHub.model.MentorshipVideo;
import com.example.internshipHub.repository.MentorshipVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MentorshipVideoServiceImpl implements MentorshipVideoService {

    @Autowired
    private MentorshipVideoRepository mentorshipVideoRepository;

    @Override
    public List<MentorshipVideo> getAllMentorshipVideos() {
        return mentorshipVideoRepository.findAll();
    }

    @Override
    public MentorshipVideo addMentorshipVideo(MentorshipVideo mentorshipVideo) {
        return mentorshipVideoRepository.save(mentorshipVideo);
    }

}