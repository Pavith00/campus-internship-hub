package com.example.internshipHub.Controller;

import com.example.internshipHub.Service.VideoService;
import com.example.internshipHub.model.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/videos")
public class VideoController {

    private final VideoService videoService;

    @Autowired
    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @GetMapping
    public List<Video> getAllVideos() {
        return videoService.getAllVideos();
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public Video addVideo(@RequestBody Video video) {
        return videoService.addVideo(video);
    }
}
