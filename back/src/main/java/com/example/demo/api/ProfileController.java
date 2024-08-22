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

import com.example.demo.Repo.ProfileRepo;
import com.example.demo.model.Profile;

@RequestMapping("api/v1/profiles")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d2m89m1u95dfaf.cloudfront.net", "https://d4aycj34v9pph.cloudfront.net"})
public class ProfileController {
    @Autowired
    ProfileRepo repo;


    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Profile addProfile(@RequestBody Profile profile){
        return repo.save(profile);
    }

    @GetMapping
    public List<Profile> getAllProfiles(){
        return repo.findAll();
    }

    @GetMapping(path = "{id}")
    public Profile getProfileById(@PathVariable("id") Integer id){
        return repo.findById(id).get();
    }

    @DeleteMapping(path = "{id}")
    public void deleteProfileById(@PathVariable("id") Integer id){
        repo.deleteById(id);
    }

    @PutMapping(path = "{id}")
    public ResponseEntity<Profile> updateProfileById(@RequestBody Profile newProfile, @PathVariable("id") Integer id){
        Optional<Profile> optionalProfile = repo.findById(id);
        if (optionalProfile.isPresent()) {
            Profile profile = optionalProfile.get();
            if (newProfile.getImage() != null) profile.setImage(newProfile.getImage());
            repo.save(profile);
            return ResponseEntity.ok(profile);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
