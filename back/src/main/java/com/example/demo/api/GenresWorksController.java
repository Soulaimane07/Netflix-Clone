package com.example.demo.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repo.GendreRepo;
import com.example.demo.Repo.MovieRepo;
import com.example.demo.Repo.SerieRepo;
import com.example.demo.model.Gendre;
import com.example.demo.model.Movie;
import com.example.demo.model.Series;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

@RequestMapping("api/v1/genres")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d22pl7wi9vfqrc.cloudfront.net"})
public class GenresWorksController {
    @Autowired
    private SerieRepo serieRepo;

    @Autowired
    private MovieRepo movieRepo;

    @Autowired
    private GendreRepo gendreRepo;

    private static final int LIMIT = 15;


    @GetMapping("/all")
public List<Genreswithworks> getAllGenresWithWorks(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "2") int size) {
    
    Pageable pageable = PageRequest.of(page, size);
    
    // Fetch paginated genres
    Page<Gendre> genresPage = gendreRepo.findAll(pageable);

    List<Genreswithworks> result = new ArrayList<>();
    
    // For each genre, fetch the movies and series associated with it
    for (Gendre genre : genresPage.getContent()) {
        // Fetch paginated series and movies
        // Page<Series> seriesPage = serieRepo.findByGenresId(genre.getId(), pageable);
        // Page<Movie> moviesPage = movieRepo.findByGenresId(genre.getId(), pageable);

        List<Series> series = serieRepo.findByGenresId(genre.getId());
        List<Movie> movies = movieRepo.findByGenresId(genre.getId());

        List<Series> limitedSeries = series.size() > LIMIT ? series.subList(0, LIMIT) : series;
        List<Movie> limitedMovies = movies.size() > LIMIT ? movies.subList(0, LIMIT) : movies;

        // Filter out empty genres (no movies or series)
        // if (!seriesPage.getContent().isEmpty() || !moviesPage.getContent().isEmpty()) {
            // Merge movies and series into a single list
            List<Object> mergedWorks = mergeMoviesAndSeries(limitedMovies, limitedSeries);

            // Add to result list
            result.add(new Genreswithworks(genre, mergedWorks));
        // }
    }

    return result;
}


    @GetMapping("/series")
    public List<Genreswithworks> getAllGenresWithSeries() {
        List<Genreswithworks> result = new ArrayList<>();

        // Fetch all genres
        List<Gendre> genres = gendreRepo.findAll();

        // For each genre, fetch the series associated with it
        for (Gendre genre : genres) {
            List<Series> series = serieRepo.findByGenresId(genre.getId());

            // Filter out empty genres (no series)
            if (!series.isEmpty()) {
                // Limit the number of series to 15
                List<Series> limitedSeries = series.size() > LIMIT ? series.subList(0, LIMIT) : series;

                // Since there are no movies, just add series
                result.add(new Genreswithworks(genre, new ArrayList<>(limitedSeries)));
            }
        }

        return result;
    }

    @GetMapping("/movies")
    public List<Genreswithworks> getAllGenresWithMovies() {
        List<Genreswithworks> result = new ArrayList<>();

        // Fetch all genres
        List<Gendre> genres = gendreRepo.findAll();

        // For each genre, fetch the movies associated with it
        for (Gendre genre : genres) {
            List<Movie> movies = movieRepo.findByGenresId(genre.getId());

            // Filter out empty genres (no movies)
            if (!movies.isEmpty()) {
                // Limit the number of movies to 15
                List<Movie> limitedMovies = movies.size() > LIMIT ? movies.subList(0, LIMIT) : movies;

                // Since there are no movies, just add movies
                result.add(new Genreswithworks(genre, new ArrayList<>(limitedMovies)));
            }
        }

        return result;
    }


  @GetMapping("/{genreId}")
public ResponseEntity<Genreswithworks> getAllGenresWithWorks(
        @PathVariable int genreId,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "8") int size) {

    // Fetch the genre by ID
    Gendre gendre = gendreRepo.findById(genreId).orElse(null);
    if (gendre == null) {
        return ResponseEntity.notFound().build(); // Return 404 if genre is not found
    }

    // Fetch paginated series and movies associated with the genre
    Page<Series> seriesPage = serieRepo.findByGenresId(genreId, PageRequest.of(page, size));
    Page<Movie> moviesPage = movieRepo.findByGenresId(genreId, PageRequest.of(page, size));

    // Paginate the lists
    List<Series> paginatedSeries = seriesPage.getContent();
    List<Movie> paginatedMovies = moviesPage.getContent();

    // Merge movies and series into a single list
    List<Object> mergedWorks = mergeMoviesAndSeries(paginatedMovies, paginatedSeries);

    // Return the result as a Genreswithworks object
    return ResponseEntity.ok(new Genreswithworks(gendre, mergedWorks));
}




    // Helper method to merge movies and series into a single list
    private List<Object> mergeMoviesAndSeries(List<Movie> movies, List<Series> series) {
        List<Object> mergedWorks = new ArrayList<>();
        int size = Math.max(movies.size(), series.size());

        for (int i = 0; i < size; i++) {
            if (i < movies.size()) {
                mergedWorks.add(movies.get(i));
            }
            if (i < series.size()) {
                mergedWorks.add(series.get(i));
            }
        }

        return mergedWorks;
    }

    public static class Genreswithworks {
        private Gendre genre;
        private List<Object> works; // List containing both movies and series

        public Genreswithworks(Gendre gendre, List<Object> works) {
            this.genre = gendre;
            this.works = works;
        }

        // Getters and setters
        public Gendre getGendre() {
            return genre;
        }

        public void setGendre(Gendre gendre) {
            this.genre = gendre;
        }

        public List<Object> getWorks() {
            return works;
        }

        public void setWorks(List<Object> works) {
            this.works = works;
        }
    }
}
