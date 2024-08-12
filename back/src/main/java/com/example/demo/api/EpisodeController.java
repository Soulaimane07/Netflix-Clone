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

import com.example.demo.Repo.EpisodeRepo;
import com.example.demo.Repo.SeasonRepo;
import com.example.demo.model.Episode;
import com.example.demo.model.Season;

@RequestMapping("api/v1/episodes")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d2m89m1u95dfaf.cloudfront.net"})
public class EpisodeController {
    @Autowired
    EpisodeRepo repo;

    @Autowired
    SeasonRepo Seasonrepo;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Episode addProfile(@RequestBody Episode episode){
        Season season = Seasonrepo.findById(episode.getSeasonId()).get();
        season.setEpisodes( season.getEpisodes() + 1);
        Seasonrepo.save(season);
        return repo.save(episode);
    }

    @GetMapping
    public List<Episode> getAllProfiles(){
        return repo.findAll();
    }

    @GetMapping(path = "{id}")
    public Episode getProfileById(@PathVariable("id") Integer id){
        return repo.findById(id).get();
    }

    @DeleteMapping(path = "{id}")
    public void deleteProfileById(@PathVariable("id") Integer id){
        Season season = Seasonrepo.findById(id).get();
        season.setEpisodes( season.getEpisodes() - 1);
        Seasonrepo.save(season);

        repo.deleteById(id);
    }

    @GetMapping("/season/{seasonId}")
    public List<Episode> getSeasonsBySeriesId(@PathVariable("seasonId") int seasonId) {
        return repo.findBySeason(Seasonrepo.findById(seasonId).get());
    }
}
