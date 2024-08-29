package com.example.demo.api;

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

import com.example.demo.Repo.UserViewingHistoryRepo;
import com.example.demo.model.UserViewingHistory;

@RequestMapping("api/v1/userviewing")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d2m89m1u95dfaf.cloudfront.net", "https://d4aycj34v9pph.cloudfront.net"})
public class UserViewingHistoryController {
    @Autowired
    UserViewingHistoryRepo repo;


    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public UserViewingHistory addProfile(@RequestBody UserViewingHistory UserViewingHistory){
        return repo.save(UserViewingHistory);
    }

    @GetMapping
    public java.util.List<UserViewingHistory> getAllProfiles(){
        return repo.findAll();
    }

    @GetMapping(path = "{id}")
    public UserViewingHistory getProfileById(@PathVariable("id") Integer id){
        return repo.findById(id).get();
    }

    @DeleteMapping(path = "{id}")
    public void deleteProfileById(@PathVariable("id") Integer id){
        repo.deleteById(id);
    }

}
