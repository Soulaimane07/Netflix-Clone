package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="users")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="Email")
    private String email;

    @Column(name="pass")
    private String pass;

    @Column(name="fname")
    private String fname;

    @Column(name="lname")
    private String lname;

    @Column(name="profiles")
    private Integer profiles;
    
    public Person(){
    }

    public Person(String email, String pass, String fname, String lname, Integer profiles){
        super();
        this.email = email;
        this.pass = pass;
        this.fname = fname;
        this.lname = lname;
        this.profiles = profiles;
    }

    public int getId(){
        return id;
    }

    public String getEmail(){
        return email;
    }
    
    public String getPassword(){
        return pass;
    }
    
    public String getFname(){
        return fname;
    }
    
    public String getLname(){
        return lname;
    }

    public Integer getProfiles(){
        return profiles;
    }
}
