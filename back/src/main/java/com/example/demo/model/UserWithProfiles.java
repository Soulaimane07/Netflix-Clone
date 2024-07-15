package com.example.demo.model;

import java.util.List;

public class UserWithProfiles {
    private Person person;
    private List<UserProfile> profiles;

    public UserWithProfiles(){
    }

    public UserWithProfiles(Person person, List<UserProfile> profiles){
        this.person = person;
        this.profiles = profiles;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public List<UserProfile> getProfiles() {
        return profiles;
    }

    public void setProfiles(List<UserProfile> profiles) {
        this.profiles = profiles;
    }
}
