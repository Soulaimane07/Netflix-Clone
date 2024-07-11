package com.example.demo.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Person;

public interface UserRepo extends JpaRepository<Person, Integer> {
    Optional<Person> findByEmailAndPass(String email, String pass);
}
