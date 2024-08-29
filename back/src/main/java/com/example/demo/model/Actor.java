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
@Table(name="actors")
public class Actor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="genre")
    private Boolean genre;

    @Column(name="image")
    private String image;

    @Column(name="birthdate")
    private String birthdate;

    @Column(name="biography")
    private String biography;

    public Actor() {
    }

    public Actor(String name, String birthdate, String biography, String image){
        super();
        this.name = name;
        this.image = image;
        this.birthdate = birthdate;
        this.biography = biography;
    }
}