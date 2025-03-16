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

    @Column(name="Email", unique = true, nullable = false)
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
        this.profiles = 0;
    }

    public Person(String email, String pass, String fname, String lname, Integer profiles){
        super();
        this.email = email;
        this.pass = pass;
        this.fname = fname;
        this.lname = lname;
        this.profiles = 0;
    }

    public int getId(){
        return id;
    }

    public String getEmail(){
        return email;
    }
    
    public String getPass(){
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

    public void setProfiles() {
        this.profiles++;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public void setPass(String pass){
        this.pass = pass;
    }

    public void setFname(String fname){
        this.fname = fname;
    }

    public void setLname(String lname){
        this.lname = lname;
    }
}
