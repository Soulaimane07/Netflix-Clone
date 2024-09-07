package com.example.demo.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Movie;

public interface MovieRepo extends JpaRepository<Movie, Integer> {
    List<Movie> findByGenresId(int genreId);
    List<Movie> findByGenresId(List<Integer> genreId);
    List<Movie> findByNetworkId(int networkId);
    List<Movie> findByTitleContainingIgnoreCase(String title);
}