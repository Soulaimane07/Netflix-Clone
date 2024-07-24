package com.example.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="gendres")
public class Gendre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="title")
    private String title;

    @Column(name="image")
    private String image;

    // @ManyToMany(mappedBy = "movies")
    // @JsonIgnore
    // private List<Movie> movies;

    public Gendre() {
    }

    public Gendre(String image, String title){
        super();
        this.image = image;
        this.title = title;
    }

    public int getId(){
        return id;
    }

    public String getImage(){
        return image;
    }

    public String getTitle(){
        return title;
    }
    
    public void setImage(String image){
        this.image = image;
    }
}