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

import com.example.demo.Repo.ProfileRepo;
import com.example.demo.Repo.SerieRepo;
import com.example.demo.model.Profile;
import com.example.demo.model.Series;


@RequestMapping("api/v1/series")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://netflixfront.s3-website.eu-west-3.amazonaws.com"})
public class SerieController {
    @Autowired
    SerieRepo repo;
    
    @Autowired
    private ProfileRepo profileRepo;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Series addProfile(@RequestBody Series serie){
        return repo.save(serie);
    }

    @GetMapping
    public List<Series> getAllProfiles(){
        return repo.findAll();
    }

    @GetMapping(path = "{id}")
    public Series getProfileById(@PathVariable("id") Integer id){
        return repo.findById(id).get();
    }

    @DeleteMapping(path = "{id}")
    public void deleteProfileById(@PathVariable("id") Integer id){
        repo.deleteById(id);
    }

    @GetMapping(path = "/network/{id}")
    public List<Series> getMoviesByNetwork(@PathVariable("id") int networkId) {
        return repo.findByNetworkId(networkId);
    }

    @GetMapping(path = "/gendre/{id}")
    public List<Series> getMoviesByGenre(@PathVariable("id") int genreId) {
        return repo.findByGenresId(genreId);
    }




    @PostMapping("/{profileId}/favorites/{seriesId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void addFavoriteSeries(@PathVariable("profileId") Integer profileId, @PathVariable("seriesId") Integer seriesId) {
        Profile profile = profileRepo.findById(profileId).orElseThrow(() -> new RuntimeException("Profile not found"));
        Series series = repo.findById(seriesId).orElseThrow(() -> new RuntimeException("Series not found"));
        
        if (!profile.getFavoriteSeries().contains(series)) {
            profile.getFavoriteSeries().add(series);
            profileRepo.save(profile);
        }
    }

    @DeleteMapping("/{profileId}/favorites/{seriesId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void removeFavoriteSeries(@PathVariable("profileId") Integer profileId, @PathVariable("seriesId") Integer seriesId) {
        Profile profile = profileRepo.findById(profileId).orElseThrow(() -> new RuntimeException("Profile not found"));
        Series series = repo.findById(seriesId).orElseThrow(() -> new RuntimeException("Series not found"));
        
        if (profile.getFavoriteSeries().contains(series)) {
            profile.getFavoriteSeries().remove(series);
            profileRepo.save(profile);
        }
    }
}
