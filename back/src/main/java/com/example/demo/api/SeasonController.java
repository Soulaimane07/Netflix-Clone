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

import com.example.demo.Repo.SeasonRepo;
import com.example.demo.Repo.SerieRepo;
import com.example.demo.model.Season;
import com.example.demo.model.Series;

@RequestMapping("api/v1/seasons")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d2m89m1u95dfaf.cloudfront.net", "https://d2egxremnzf4q5.cloudfront.net"})
public class SeasonController {
    @Autowired
    SeasonRepo repo;

    @Autowired
    SerieRepo Serierepo;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Season addProfile(@RequestBody Season season){
        Series serie = Serierepo.findById(season.getSerieId()).get();
        serie.setSeasons(serie.getSeasons() == null ? 1 : serie.getSeasons() + 1);
        Serierepo.save(serie);
        return repo.save(season);
    }

    @GetMapping
    public List<Season> getAllProfiles(){
        return repo.findAll();
    }

    @GetMapping(path = "{id}")
    public Season getProfileById(@PathVariable("id") Integer id){
        return repo.findById(id).get();
    }

    @DeleteMapping(path = "{id}")
    public void deleteProfileById(@PathVariable("id") Integer id){
        repo.deleteById(id);
    }

    @GetMapping("/serie/{serieId}")
    public List<Season> getSeasonsBySeriesId(@PathVariable("serieId") int serieId) {
        return repo.findBySerie(Serierepo.findById(serieId).get());
    }
}
