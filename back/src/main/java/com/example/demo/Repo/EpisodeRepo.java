package com.example.demo.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Episode;
import com.example.demo.model.Season;

public interface EpisodeRepo extends JpaRepository<Episode, Integer> {
    List<Episode> findBySeason(Season season);
}
