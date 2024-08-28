package com.example.demo.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repo.TestRepo;
import com.example.demo.model.Test;

@RequestMapping("api/v1/test")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d2m89m1u95dfaf.cloudfront.net", "https://d4aycj34v9pph.cloudfront.net"})
public class TestController {
    @Autowired
    TestRepo repo;

    @GetMapping
    public java.util.List<Test> getAllProfiles(){
        return repo.findAll();
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Test addProfile(@RequestBody Test test){
        return repo.save(test);
    }

}
