package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Network;

public interface NetworkRepo extends JpaRepository<Network, Integer> {
}
