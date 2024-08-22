package com.example.demo.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repo.GendreRepo;
import com.example.demo.Repo.MovieRepo;
import com.example.demo.Repo.SerieRepo;
import com.example.demo.model.Gendre;
import com.example.demo.model.Movie;
import com.example.demo.model.Series;

@RequestMapping("api/v1/genres")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d2m89m1u95dfaf.cloudfront.net", "https://d4aycj34v9pph.cloudfront.net"})
public class GenresWorksController {
    @Autowired
    private SerieRepo serieRepo;

    @Autowired
    private MovieRepo movieRepo;

    @Autowired
    private GendreRepo gendreRepo;

    @GetMapping("/all")
    public List<Genreswithworks> getAllGenresWithWorks() {
        List<Genreswithworks> result = new ArrayList<>();

        // Fetch all genres
        List<Gendre> genres = gendreRepo.findAll();

        // For each genre, fetch the movies and series associated with it
        for (Gendre genre : genres) {
            List<Series> series = serieRepo.findByGenresId(genre.getId());
            List<Movie> movies = movieRepo.findByGenresId(genre.getId());

            // Add to result list
            result.add(new Genreswithworks(genre, series, movies));
        }

        return result;
    }

    @GetMapping("/movies")
    public List<Genreswithworks> getAllGenresWithMovies() {
        List<Genreswithworks> result = new ArrayList<>();

        // Fetch all genres
        List<Gendre> genres = gendreRepo.findAll();

        // For each genre, fetch the movies and series associated with it
        for (Gendre genre : genres) {
            List<Series> series = null;
            List<Movie> movies = movieRepo.findByGenresId(genre.getId());

            // Add to result list
            result.add(new Genreswithworks(genre, series, movies));
        }

        return result;
    }

    @GetMapping("/series")
    public List<Genreswithworks> getAllGenresWithSeries() {
        List<Genreswithworks> result = new ArrayList<>();

        // Fetch all genres
        List<Gendre> genres = gendreRepo.findAll();

        // For each genre, fetch the movies and series associated with it
        for (Gendre genre : genres) {
            List<Series> series = serieRepo.findByGenresId(genre.getId());
            List<Movie> movies = null;

            // Add to result list
            result.add(new Genreswithworks(genre, series, movies));
        }

        return result;
    }

    @GetMapping("/{genreId}")
    public Genreswithworks getAllGenresWithWorks(@PathVariable int genreId) {
        // Fetch the genre by ID
        Gendre gendre = gendreRepo.findById(genreId).orElse(null);
        if (gendre == null) {
            return null; // Return null if genre is not found, or you can handle it differently
        }
    
        // Fetch movies and series associated with the genre
        List<Series> series = serieRepo.findByGenresId(genreId); // Assuming findByGenresId is the correct method
        List<Movie> movies = movieRepo.findByGenresId(genreId); // Assuming findByGenresId is the correct method
    
        // Return the result as a Genreswithworks object
        return new Genreswithworks(gendre, series, movies);
    }




    public static class Genreswithworks {
        private Gendre genre;
        private List<Series> series;
        private List<Movie> movies;

        public Genreswithworks(Gendre gendre, List<Series> series, List<Movie> movies) {
            this.genre = gendre;
            this.series = series;
            this.movies = movies;
        }

        // Getters and setters (if needed)
        public Gendre getGendre() {
            return genre;
        }

        public void setGendre(Gendre gendre) {
            this.genre = gendre;
        }

        public List<Series> getSeries() {
            return series;
        }

        public void setSeries(List<Series> series) {
            this.series = series;
        }

        public List<Movie> getMovies() {
            return movies;
        }

        public void setMovies(List<Movie> movies) {
            this.movies = movies;
        }
    }
}
