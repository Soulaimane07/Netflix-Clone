package com.example.demo.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Season;
import com.example.demo.model.Series;

public interface SeasonRepo extends JpaRepository<Season, Integer>  {
    List<Season> findBySerie(Series serie);
}