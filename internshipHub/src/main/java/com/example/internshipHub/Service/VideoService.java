package com.example.internshipHub.Service;

import com.example.internshipHub.model.Video;
import com.example.internshipHub.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoService {

    private final VideoRepository videoRepository;


    @Autowired
    public VideoService(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    public Video addVideo(Video video) {
        return videoRepository.save(video);
    }
}
