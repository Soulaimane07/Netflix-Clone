package com.example.demo.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repo.UserProfileRepo;
import com.example.demo.Repo.UserRepo;
import com.example.demo.model.Person;
import com.example.demo.model.UserProfile;
import com.example.demo.model.UserWithProfiles;

@RequestMapping("api/v1/users")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d22pl7wi9vfqrc.cloudfront.net"})
public class UserController {
    @Autowired
    UserRepo repo;
    @Autowired
    UserProfileRepo userProfileRepo;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Person addUser(@RequestBody Person user){
        return repo.save(user);
    }

    @GetMapping("/getProfiles/{userid}")
    public List<UserProfile> getUserProfiles(@PathVariable("userid") int userId) {
        return userProfileRepo.findByUserId(userId);
    }


    @PostMapping("/login")
    public ResponseEntity<UserWithProfiles> login(@RequestBody Person user) {
        Optional<Person> personOptional = repo.findByEmailAndPass(user.getEmail(), user.getPass());
        
        if (personOptional.isPresent()) {
            Person person = personOptional.get();
            
            // Fetch profiles associated with the person
            List<UserProfile> profiles = getUserProfiles(person.getId());
            
            // Create DTO to combine Person and profiles
            UserWithProfiles userWithProfiles = new UserWithProfiles(person, profiles);
            
            return ResponseEntity.ok(userWithProfiles);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
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
    public ResponseEntity<Person> updateUserById(@RequestBody Person newUser, @PathVariable("id") Integer id){
        Optional<Person> optionalUser = repo.findById(id);
        if (optionalUser.isPresent()) {
            Person user = optionalUser.get();
            if (newUser.getEmail() != null) user.setEmail(newUser.getEmail());
            if (newUser.getFname() != null) user.setFname(newUser.getFname());
            if (newUser.getLname() != null) user.setLname(newUser.getLname());
            if (newUser.getPass() != null) user.setPass(newUser.getPass());
            repo.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
