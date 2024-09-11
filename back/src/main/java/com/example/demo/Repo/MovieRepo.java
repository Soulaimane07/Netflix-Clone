package com.example.demo.Repo;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Movie;
public interface MovieRepo extends JpaRepository<Movie, Integer> {
    List<Movie> findByGenresId(int genreId);
    Page<Movie> findByGenresId(int genreId, Pageable pageable);
    List<Movie> findByNetworkId(int networkId);
    List<Movie> findByTitleContainingIgnoreCase(String title);
    Page<Movie> findByNetworkId(int networkId, Pageable pageable);
}