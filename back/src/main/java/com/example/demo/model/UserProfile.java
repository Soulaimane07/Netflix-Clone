package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="userprofile")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Person user;

    @Column(name="profileid")
    private int profileId;

    @Column(name="name")
    private String name;

    public UserProfile() {
    }

    public UserProfile(Person user, int profileId, String name){
        super();
        this.user = user;
        this.profileId = profileId;
        this.name = name;
    }

    public Person getUser(){
        return this.user;
    }
    
    public void setUser(Person user){
        this.user = user;
    }
}
