package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.example.demo.dao.UserDao;
import com.example.demo.model.Person;

@Service
public class UserService {
    private final UserDao userDao;

    public UserService(@Qualifier("postgres") UserDao userDao){
        this.userDao = userDao;
    }
    
    public int addUser(Person user){
        return userDao.insertUser(user);
    }

    public List<Person> getAllUsers(){
        return userDao.selectAllUsers();
    }

    public Optional<Person> getUserById(UUID id){
        return userDao.selectUserById(id);
    }

    public int deleteUserById(UUID id){
        return userDao.deleteUserById(id);
    }

    public int updateUserById(UUID id, Person user){
        return userDao.updateUserById(id, user);
    }
}
