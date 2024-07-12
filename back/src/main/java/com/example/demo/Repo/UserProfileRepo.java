package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.UserProfile;

public interface UserProfileRepo extends JpaRepository<UserProfile, Integer> {
}
