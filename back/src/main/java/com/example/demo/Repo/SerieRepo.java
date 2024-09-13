package com.example.demo.Repo;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Series;

public interface SerieRepo extends JpaRepository<Series, Integer> {
    List<Series> findByGenresId(int genreId);
    Page<Series> findByGenresId(int genreId, Pageable pageable);
    List<Series> findByNetworkId(int networkId);
    List<Series> findByTitleContainingIgnoreCase(String title);
    Page<Series> findByNetworkId(int networkId, Pageable pageable);
}