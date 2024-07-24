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
@Table(name="gendres")
public class Gendre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="title")
    private String title;

    @Column(name="image")
    private String image;

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