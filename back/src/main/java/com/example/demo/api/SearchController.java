package com.example.demo.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repo.MovieRepo;
import com.example.demo.Repo.SerieRepo;
import com.example.demo.model.Movie;
import com.example.demo.model.Series;

@RequestMapping("api/v1/search")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://netflixfront.s3-website.eu-west-3.amazonaws.com"})
public class SearchController {
    @Autowired
    private SerieRepo serieRepo;

    @Autowired
    private MovieRepo movieRepo;

    // Search for both series and movies by title
    @GetMapping("")
    public SearchResult searchBoth(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "genreId", required = false) Integer genreId) {
        
        List<Series> series = title != null ? serieRepo.findByTitleContainingIgnoreCase(title) : List.of();
        List<Movie> movies = title != null ? movieRepo.findByTitleContainingIgnoreCase(title) : List.of();

        if (genreId != null) {
            series = serieRepo.findByGenresId(genreId);
            movies = movieRepo.findByGenresId(genreId);
        }

        return new SearchResult(series, movies);
    }

    // Define a nested class to represent the combined result
    public static class SearchResult {
        private List<Series> series;
        private List<Movie> movies;

        public SearchResult(List<Series> series, List<Movie> movies) {
            this.series = series;
            this.movies = movies;
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
