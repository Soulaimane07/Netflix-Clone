package com.example.demo.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.UserProfile;

public interface UserProfileRepo extends JpaRepository<UserProfile, Integer> {
        List<UserProfile> findByUserId(int userId);
}
