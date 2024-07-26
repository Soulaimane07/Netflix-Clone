package com.example.demo.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Series;

public interface SerieRepo extends JpaRepository<Series, Integer> {
    List<Series> findByGenresId(int genreId);
    List<Series> findByNetworkId(int networkId);
}
