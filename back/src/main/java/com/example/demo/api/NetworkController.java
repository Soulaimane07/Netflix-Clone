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

import com.example.demo.Repo.NetworkRepo;
import com.example.demo.model.Network;

@RequestMapping("api/v1/networks")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://netflixfront.s3-website.eu-west-3.amazonaws.com"})
public class NetworkController {
    @Autowired
    NetworkRepo repo;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Network addProfile(@RequestBody Network network){
        return repo.save(network);
    }

    @GetMapping
    public List<Network> getAllProfiles(){
        return repo.findAll();
    }

    @GetMapping(path = "{id}")
    public Network getProfileById(@PathVariable("id") Integer id){
        return repo.findById(id).get();
    }

    @DeleteMapping(path = "{id}")
    public void deleteProfileById(@PathVariable("id") Integer id){
        repo.deleteById(id);
    }

}
