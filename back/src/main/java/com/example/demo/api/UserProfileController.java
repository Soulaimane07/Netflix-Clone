package com.example.demo.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repo.UserProfileRepo;
import com.example.demo.Repo.UserRepo;
import com.example.demo.model.Person;
import com.example.demo.model.UserProfile;

@RequestMapping("api/v1/userprofiles")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d2m89m1u95dfaf.cloudfront.net", "https://d4aycj34v9pph.cloudfront.net"})
public class UserProfileController {
    @Autowired
    private final UserProfileRepo repo;
    @Autowired
    private final UserRepo repoUser;
    
    public UserProfileController(UserProfileRepo repo, UserRepo repoUser) {
        this.repo = repo;
        this.repoUser = repoUser;
    }

    @GetMapping
    public List<UserProfile> getAllProfiles(){
        return repo.findAll();
    }

    @GetMapping(path = "{id}")
    public UserProfile getUserById(@PathVariable("id") Integer id){
        return repo.findById(id).get();
    }

    // @PostMapping
    // public ResponseEntity<UserProfile> addUser(@RequestBody UserProfile userProfile) {
    //     int userId = userProfile.getUser().getId();
    //     Optional<Person> optionalUser = repoUser.findById(userId);

    //     Person user = optionalUser.get();

    //     if (user.getProfiles() < 5) {
    //         user.setProfiles(user.getProfiles() + 1);
    //         repoUser.save(user);

    //         userProfile.setUser(user);
    //         return ResponseEntity.status(HttpStatus.CREATED).body(repo.save(userProfile));
    //     } else {
    //         userProfile.setUser(user);
    //         return ResponseEntity.status(HttpStatus.ACCEPTED).body(userProfile);
    //     }
    // }

    @PostMapping
    public ResponseEntity<UserProfile> addUser(@RequestBody UserProfile userProfile) {
        int userProfileId = userProfile.getUser().getId();
        Optional<Person> optionalPerson = repoUser.findById(userProfileId);

        if (optionalPerson.isPresent()) {
            Person person = optionalPerson.get();
            System.out.println("Person: " + person);

            if (person.getProfiles() >= 5) {
                return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
            } else {
                person.setProfiles();
                repoUser.save(person);
                userProfile.setUser(person);
                return ResponseEntity.status(HttpStatus.CREATED).body(repo.save(userProfile));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // User not found
        }
    }

}
