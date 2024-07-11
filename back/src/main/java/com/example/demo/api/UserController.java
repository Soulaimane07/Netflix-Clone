package com.example.demo.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repo.UserRepo;
import com.example.demo.model.Person;

@RequestMapping("api/v1/users")
@RestController
public class UserController {
    @Autowired
    UserRepo repo;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Person addUser(@RequestBody Person user){
        return repo.save(user);
    }

    @GetMapping
    public List<Person> getAllUsers(){
        return repo.findAll();
    }

    @GetMapping(path = "{id}")
    public Person getUserById(@PathVariable("id") Integer id){
        return repo.findById(id).get();
    }

    @DeleteMapping(path = "{id}")
    public void deleteUserById(@PathVariable("id") Integer id){
        repo.deleteById(id);
    }

    @PutMapping(path = "{id}")
    public Person updateUserById(@RequestBody Person newuser, @PathVariable("id") Integer id){
        Person user = repo.findById(id).get();
        user.setEmail(newuser.getEmail());
        user.setFname(newuser.getFname());
        user.setLname(newuser.getLname());
        user.setPass(newuser.getPass());
        repo.save(user);
        return user;
    }
}
