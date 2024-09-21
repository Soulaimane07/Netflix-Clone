package com.example.demo.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repo.EpisodeRepo;
import com.example.demo.model.Episode;

@RequestMapping("api/v1/episodes")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d22pl7wi9vfqrc.cloudfront.net"})
public class EpisodeController {
    @Autowired
    EpisodeRepo repo;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Episode addProfile(@RequestBody Episode episode){
        return repo.save(episode);
    }

    @GetMapping
    public List<Episode> getAllProfiles(){
        return repo.findAll();
    }

    @GetMapping(path = "{id}")
    public Episode getProfileById(@PathVariable("id") Integer id){
        return repo.findById(id).get();
    }

    @DeleteMapping(path = "{id}")
    public void deleteProfileById(@PathVariable("id") Integer id){
        repo.deleteById(id);
    }
}
