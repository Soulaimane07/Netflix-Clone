package com.example.demo.model;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Person {
    private final UUID id;
    private final String email;
    private final String password;
    private final String fname;
    private final String lname;
    private final Number profiles;
    
    
    public Person(@JsonProperty("id") UUID id, @JsonProperty("email") String email, @JsonProperty("password") String password, @JsonProperty("fname") String fname, @JsonProperty("lname") String lname, @JsonProperty("profiles") Number profiles){
        this.id = id;
        this.email = email;
        this.password = password;
        this.fname = fname;
        this.lname = lname;
        this.profiles = profiles;
    }

    public UUID getId(){
        return id;
    }

    public String getEmail(){
        return email;
    }
    
    public String getPassword(){
        return password;
    }
    
    public String getFname(){
        return fname;
    }
    
    public String getLname(){
        return lname;
    }

    public Number getProfiles(){
        return profiles;
    }
}
