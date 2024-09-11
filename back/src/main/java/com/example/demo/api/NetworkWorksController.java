package com.example.demo.api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repo.MovieRepo;
import com.example.demo.Repo.NetworkRepo;
import com.example.demo.Repo.SerieRepo;
import com.example.demo.model.Movie;
import com.example.demo.model.Network;
import com.example.demo.model.Series;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("api/v1/networkss")
@CrossOrigin(origins = {"http://localhost:3000", "https://d2m89m1u95dfaf.cloudfront.net", "https://d4aycj34v9pph.cloudfront.net"})
public class NetworkWorksController {
    
    @Autowired
    private SerieRepo serieRepo;

    @Autowired
    private MovieRepo movieRepo;

    @Autowired
    private NetworkRepo networkRepo;

    @GetMapping("/{networkId}")
    public ResponseEntity<NetworkWorks> getAllNetworkWithWorks(@PathVariable int networkId, 
                                                               @RequestParam(defaultValue = "0") int page, 
                                                               @RequestParam(defaultValue = "10") int size) {
        // Fetch the network by ID
        Network network = networkRepo.findById(networkId).orElse(null);
        if (network == null) {
            return ResponseEntity.notFound().build(); // Handle case when network not found
        }

        // Set up pagination
        Pageable pageable = PageRequest.of(page, size);

        // Fetch paginated series and movies associated with the network
        Page<Series> seriesPage = serieRepo.findByNetworkId(networkId, pageable);
        Page<Movie> moviePage = movieRepo.findByNetworkId(networkId, pageable);

        // Combine movies and series into an alternating list
        List<Object> combinedWorks = new ArrayList<>();
        int maxLength = Math.max(seriesPage.getContent().size(), moviePage.getContent().size());
        for (int i = 0; i < maxLength; i++) {
            if (i < moviePage.getContent().size()) {
                combinedWorks.add(moviePage.getContent().get(i));
            }
            if (i < seriesPage.getContent().size()) {
                combinedWorks.add(seriesPage.getContent().get(i));
            }
        }

        // Return the NetworkWorks object with the network and combined works list
        NetworkWorks response = new NetworkWorks(network, combinedWorks);
        return ResponseEntity.ok(response);
    }

    // Static inner class for response structure
    public static class NetworkWorks {
        private Network network;
        private List<Object> works;

        public NetworkWorks(Network network, List<Object> works) {
            this.network = network;
            this.works = works;
        }

        public Network getNetwork() {
            return network;
        }

        public List<Object> getWorks() {
            return works;
        }
    }
}
