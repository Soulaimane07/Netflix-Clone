package com.example.demo.api;

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

import com.example.demo.Repo.GendreRepo;
import com.example.demo.model.Gendre;

@RequestMapping("api/v1/gendres")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d22pl7wi9vfqrc.cloudfront.net"})
public class GendreController {
    @Autowired
    GendreRepo repo;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Gendre addProfile(@RequestBody Gendre gendre){
        return repo.save(gendre);
    }

    @GetMapping
    public java.util.List<Gendre> getAllProfiles(){
        return repo.findAll();
    }

    @GetMapping(path = "{id}")
    public Gendre getProfileById(@PathVariable("id") Integer id){
        return repo.findById(id).get();
    }

    @DeleteMapping(path = "{id}")
    public void deleteProfileById(@PathVariable("id") Integer id){
        repo.deleteById(id);
    }

    @PutMapping(path = "{id}")
    public ResponseEntity<Gendre> updateProfileById(@RequestBody Gendre newGendre, @PathVariable("id") Integer id){
        Optional<Gendre> optionalGendre = repo.findById(id);
        if (optionalGendre.isPresent()) {
            Gendre gendre = optionalGendre.get();
            if (newGendre.getImage() != null) gendre.setImage(newGendre.getImage());
            if (newGendre.getTitle() != null) gendre.setTitle(newGendre.getImage());
            repo.save(gendre);
            return ResponseEntity.ok(gendre);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}