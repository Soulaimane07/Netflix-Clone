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

import com.example.demo.Repo.ActorRepo;
import com.example.demo.model.Actor;

@RequestMapping("api/v1/actors")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d22pl7wi9vfqrc.cloudfront.net"})
public class ActorController {
    @Autowired
    ActorRepo repo;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Actor addProfile(@RequestBody Actor Actor){
        return repo.save(Actor);
    }

    @GetMapping
    public List<Actor> getAllProfiles(){
        return repo.findAll();
    }

    @GetMapping(path = "{id}")
    public Actor getProfileById(@PathVariable("id") Integer id){
        return repo.findById(id).get();
    }

    @DeleteMapping(path = "{id}")
    public void deleteProfileById(@PathVariable("id") Integer id){
        repo.deleteById(id);
    }
}
