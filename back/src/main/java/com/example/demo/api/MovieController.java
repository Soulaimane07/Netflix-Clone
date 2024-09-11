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
import com.example.demo.Repo.UserProfileRepo;
import com.example.demo.Repo.GendreRepo;
import com.example.demo.model.Gendre;
import com.example.demo.model.Movie;
import com.example.demo.model.UserProfile;

@RequestMapping("api/v1/movies")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d2m89m1u95dfaf.cloudfront.net", "https://d4aycj34v9pph.cloudfront.net"})
public class MovieController {
    @Autowired
    MovieRepo repo;

    @Autowired
    GendreRepo genreRepo;

    @Autowired
    private UserProfileRepo profileRepo;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Movie addProfile(@RequestBody Movie movie){
        return repo.save(movie);
    }

    @PostMapping("/{movieId}/genres")
    @ResponseStatus(HttpStatus.CREATED)
    public Movie addGenres(@PathVariable int movieId, @RequestBody List<Integer> genreIds) {
        Movie movie = repo.findById(movieId).orElseThrow(() -> new RuntimeException("Movie not found"));
        
        List<Gendre> genres = genreRepo.findAllById(genreIds);
        movie.setGenres(genres);
        
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

    // @GetMapping(path = "/network/{id}")
    // public List<Movie> getMoviesByNetwork(@PathVariable("id") int networkId) {
    //     return repo.findByNetworkId(networkId);
    // }

    @GetMapping(path = "/gendre/{id}")
    public List<Movie> getMoviesByGenre(@PathVariable("id") int genreId) {
        return repo.findByGenresId(genreId);
    }



    @PostMapping("/{profileId}/favorites/{movieId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void addFavoriteSeries(@PathVariable("profileId") Integer profileId, @PathVariable("movieId") Integer movieId) {
        UserProfile profile = profileRepo.findById(profileId).orElseThrow(() -> new RuntimeException("Profile not found"));
        Movie series = repo.findById(movieId).orElseThrow(() -> new RuntimeException("Series not found"));
        
        if (!profile.getFavoriteMovies().contains(series)) {
            profile.getFavoriteMovies().add(series);
            profileRepo.save(profile);
        }
    }

    @DeleteMapping("/{profileId}/favorites/{movieId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void removeFavoriteSeries(@PathVariable("profileId") Integer profileId, @PathVariable("movieId") Integer movieId) {
        UserProfile profile = profileRepo.findById(profileId).orElseThrow(() -> new RuntimeException("Profile not found"));
        Movie movie = repo.findById(movieId).orElseThrow(() -> new RuntimeException("Series not found"));
        
        if (profile.getFavoriteMovies().contains(movie)) {
            profile.getFavoriteMovies().remove(movie);
            profileRepo.save(profile);
        }
    }

















    
}
