package com.example.demo.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repo.MovieRepo;
import com.example.demo.Repo.NetworkRepo;
import com.example.demo.Repo.SerieRepo;
import com.example.demo.model.Movie;
import com.example.demo.model.Network;
import com.example.demo.model.Series;

@RequestMapping("api/v1/networkss")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://netflixfront.s3-website.eu-west-3.amazonaws.com"})
public class NetworkWorksController {
    @Autowired
    private SerieRepo serieRepo;

    @Autowired
    private MovieRepo movieRepo;

    @Autowired
    private NetworkRepo networkRepo;

    @GetMapping("/{networkId}")
    public NetworkWorks getAllNetworkWithWorks(@PathVariable int networkId) {
        // Fetch the network by ID
        Network network = networkRepo.findById(networkId).orElse(null);
        if (network == null) {
            return null; // or handle this case as needed
        }

        // Fetch series and movies associated with the network
        List<Series> series = serieRepo.findByNetworkId(networkId);
        List<Movie> movies = movieRepo.findByNetworkId(networkId);

        // Return the NetworkWorks object
        return new NetworkWorks(network, series, movies);
    }

    public static class NetworkWorks {
        private Network network;
        private List<Series> series;
        private List<Movie> movies;

        public NetworkWorks(Network network, List<Series> series, List<Movie> movies) {
            this.network = network;
            this.series = series;
            this.movies = movies;
        }

        // Getters and setters (if needed)
        public Network getNetwork() {
            return network;
        }

        public void setNetwork(Network network) {
            this.network = network;
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
