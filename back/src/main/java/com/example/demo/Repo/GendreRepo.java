package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Gendre;

public interface GendreRepo extends JpaRepository<Gendre, Integer> {
}
