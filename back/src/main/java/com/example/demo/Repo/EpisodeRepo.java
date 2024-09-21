package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Episode;

public interface EpisodeRepo extends JpaRepository<Episode, Integer> {
}
