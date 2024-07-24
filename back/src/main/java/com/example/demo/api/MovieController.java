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

import com.example.demo.Repo.MovieRepo;
import com.example.demo.model.Movie;

@RequestMapping("api/v1/movies")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {
    @Autowired
    MovieRepo repo;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Movie addProfile(@RequestBody Movie movie){
        return repo.save(movie);
    }

    @GetMapping
    public java.util.List<Movie> getAllProfiles(){
        return repo.findAll();
    }

    @GetMapping(path = "{id}")
    public Movie getProfileById(@PathVariable("id") Integer id){
        return repo.findById(id).get();
    }

    @DeleteMapping(path = "{id}")
    public void deleteProfileById(@PathVariable("id") Integer id){
        repo.deleteById(id);
    }

    @GetMapping(path = "/network/{id}")
    public List<Movie> getMoviesByNetwork(@PathVariable("id") int networkId) {
        return repo.findByNetworkId(networkId);
    }

    @GetMapping(path = "/gendre/{id}")
    public List<Movie> getMoviesByGenre(@PathVariable("id") int genreId) {
        return repo.findByGenresId(genreId);
    }
}
