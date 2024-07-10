package com.example.demo.api;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Person;
import com.example.demo.service.UserService;

@RequestMapping("api/v1/user")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping
    public void addUser(@RequestBody Person user){
        userService.addUser(user);
    }

    @GetMapping
    public List<Person> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping(path = "{id}")
    public Person getUserById(@PathVariable("id") UUID id){
        return userService.getUserById(id).orElse(null);
    }

    @DeleteMapping(path = "{id}")
    public void deleteUserById(@PathVariable("id") UUID id){
        userService.deleteUserById(id);
    }

    @PutMapping(path = "{id}")
    public void updateUserById(@PathVariable("id") UUID id, @RequestBody Person user){
        userService.updateUserById(id, user);
    }
}
