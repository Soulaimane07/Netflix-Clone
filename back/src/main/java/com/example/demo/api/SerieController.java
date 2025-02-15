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

import com.example.demo.Repo.GendreRepo;
import com.example.demo.Repo.SerieRepo;
import com.example.demo.Repo.UserProfileRepo;
import com.example.demo.model.Gendre;
import com.example.demo.model.Series;
import com.example.demo.model.UserProfile;


@RequestMapping("api/v1/series")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d22pl7wi9vfqrc.cloudfront.net"})
public class SerieController {
    @Autowired
    SerieRepo repo;

    @Autowired
    GendreRepo genreRepo;
    
    @Autowired
    private UserProfileRepo profileRepo;

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

    // @GetMapping(path = "/network/{id}")
    // public List<Series> getMoviesByNetwork(@PathVariable("id") int networkId) {
    //     return repo.findByNetworkId(networkId);
    // }

    @GetMapping(path = "/gendre/{id}")
    public List<Series> getMoviesByGenre(@PathVariable("id") int genreId) {
        return repo.findByGenresId(genreId);
    }
    




    @PostMapping("/{profileId}/favorites/{seriesId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void addFavoriteSeries(@PathVariable("profileId") Integer profileId, @PathVariable("seriesId") Integer seriesId) {
        UserProfile profile = profileRepo.findById(profileId).orElseThrow(() -> new RuntimeException("Profile not found"));
        Series series = repo.findById(seriesId).orElseThrow(() -> new RuntimeException("Series not found"));
        
        if (!profile.getFavoriteSeries().contains(series)) {
            profile.getFavoriteSeries().add(series);
            profileRepo.save(profile);
        }
    }

    @DeleteMapping("/{profileId}/favorites/{seriesId}")
    @ResponseStatus(code = HttpStatus.OK)
    public void removeFavoriteSeries(@PathVariable("profileId") Integer profileId, @PathVariable("seriesId") Integer seriesId) {
        UserProfile profile = profileRepo.findById(profileId).orElseThrow(() -> new RuntimeException("Profile not found"));
        Series series = repo.findById(seriesId).orElseThrow(() -> new RuntimeException("Series not found"));
        
        if (profile.getFavoriteSeries().contains(series)) {
            profile.getFavoriteSeries().remove(series);
            profileRepo.save(profile);
        }
    }


    @GetMapping("/search/{title}")
    public List<Series> searchByTitle(@PathVariable("title") String title) {
        return repo.findByTitleContainingIgnoreCase(title);
    }






    @PostMapping("/{serieId}/genres")
    @ResponseStatus(HttpStatus.CREATED)
    public Series addGenres(@PathVariable int serieId, @RequestBody List<Integer> genreIds) {
        Series serie = repo.findById(serieId).orElseThrow(() -> new RuntimeException("Serie not found"));
        
        List<Gendre> genres = genreRepo.findAllById(genreIds);
        serie.setGenres(genres);
        
        return repo.save(serie);
    }
}
