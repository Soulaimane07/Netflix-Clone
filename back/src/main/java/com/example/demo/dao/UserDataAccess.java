package com.example.demo.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.example.demo.model.Person;

@Repository("postgres")
public class UserDataAccess implements UserDao {

    @Override
    public int insertUser(UUID id, Person user) {
        return 0;
    }

    @Override
    public List<Person> selectAllUsers() {
        return List.of(new Person(UUID.randomUUID(), null, null, null, null, null));
    }

    @Override
    public Optional<Person> selectUserById(UUID id) {
        return Optional.empty();
    }

    @Override
    public int deleteUserById(UUID id) {
        return 0;
    }

    @Override
    public int updateUserById(UUID id, Person user) {
        return 0;
    }
    
}
