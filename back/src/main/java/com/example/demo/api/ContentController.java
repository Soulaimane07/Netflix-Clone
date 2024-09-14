package com.example.demo.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repo.MovieRepo;
import com.example.demo.Repo.SerieRepo;
import com.example.demo.model.Movie;
import com.example.demo.model.Series;

@RestController
@RequestMapping("/api/v1/content")
@CrossOrigin(origins = {"http://localhost:3000", "https://d22pl7wi9vfqrc.cloudfront.net"})
public class ContentController {

    @Autowired
    private MovieRepo movieRepo;

    @Autowired
    private SerieRepo serieRepo;

    @GetMapping("/random")
    public ResponseEntity<Object> getRandomContent() {
        List<Movie> movies = movieRepo.findAll();
        List<Series> series = serieRepo.findAll();

        // If both lists are empty, return no content
        if (movies.isEmpty() && series.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        // Combine movies and series into one list
        List<Object> contentList = new ArrayList<>();
        contentList.addAll(movies);
        contentList.addAll(series);

        // Generate a random index to fetch either a movie or series
        Random random = new Random();
        int randomIndex = random.nextInt(contentList.size());

        // Return the randomly selected movie or series
        return new ResponseEntity<>(contentList.get(randomIndex), HttpStatus.OK);
    }

    @GetMapping("/movie")
    public ResponseEntity<Object> getRandomMovie() {
        List<Movie> movies = movieRepo.findAll();

        // If both lists are empty, return no content
        if (movies.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        // Generate a random index to fetch either a movie or series
        Random random = new Random();
        int randomIndex = random.nextInt(movies.size());

        // Return the randomly selected movie or series
        return new ResponseEntity<>(movies.get(randomIndex), HttpStatus.OK);
    }

    @GetMapping("/serie")
    public ResponseEntity<Object> getRandomSerie() {
        List<Series> series = serieRepo.findAll();

        // If both lists are empty, return no content
        if (series.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        // Generate a random index to fetch either a serie or series
        Random random = new Random();
        int randomIndex = random.nextInt(series.size());

        // Return the randomly selected serie or series
        return new ResponseEntity<>(series.get(randomIndex), HttpStatus.OK);
    }
}
