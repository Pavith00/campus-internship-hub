package com.example.internshipHub.Controller;

import com.example.internshipHub.model.MentorshipVideo;
import com.example.internshipHub.Service.MentorshipVideoServiceImpl;
import com.example.internshipHub.Service.MentorshipVideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/mentorship-videos")
public class MentorshipVideoController {

    @Autowired
    private MentorshipVideoService mentorshipVideoService;

    @GetMapping
    public List<MentorshipVideo> getAllMentorshipVideos() {
        return mentorshipVideoService.getAllMentorshipVideos();
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public MentorshipVideo addMentorshipVideo(@RequestBody MentorshipVideo mentorshipVideo) {
        return mentorshipVideoService.addMentorshipVideo(mentorshipVideo);
    }

    // Other endpoints as needed
}
