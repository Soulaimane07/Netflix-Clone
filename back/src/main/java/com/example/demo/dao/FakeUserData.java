package com.example.demo.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.example.demo.model.Person;

@Repository("fakeDao")
public class FakeUserData implements UserDao {
    private static List<Person> DB = new ArrayList<>();

    @Override
    public int insertUser(UUID id, Person user) {
        DB.add(new Person(id, user.getEmail(), user.getPassword(), user.getFname(), user.getLname(), user.getProfiles()));
        return 1;
    }

    @Override
    public List<Person> selectAllUsers() {
        return DB;
    }

    @Override
    public int deleteUserById(UUID id) {
        Optional<Person> user = selectUserById(id);
        if(user.isEmpty()){
            return 0;
        } 
        DB.remove(user.get());
        return 1;
    }

    @Override
    public int updateUserById(UUID id, Person userUpdate) {
        return selectUserById(id).map(user -> {
                    int indexOfUser = DB.indexOf(user);
                    if(indexOfUser >= 0){
                        DB.set(indexOfUser, new Person(id, userUpdate.getEmail(), userUpdate.getPassword(), userUpdate.getFname(), userUpdate.getLname(), userUpdate.getProfiles()));
                        return 1;
                    }
                    return 0;
                }).orElse(0);
    }

    @Override
    public Optional<Person> selectUserById(UUID id) {
        return DB.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst();
    }
    
}
