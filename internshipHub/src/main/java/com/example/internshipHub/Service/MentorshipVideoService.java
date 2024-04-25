package com.example.internshipHub.Service;

import com.example.internshipHub.model.MentorshipVideo;
import com.example.internshipHub.Controller.MentorshipVideoController;
import java.util.List;

public interface MentorshipVideoService {
    List<MentorshipVideo> getAllMentorshipVideos();
    MentorshipVideo addMentorshipVideo(MentorshipVideo mentorshipVideo);
    // Other methods as needed
}