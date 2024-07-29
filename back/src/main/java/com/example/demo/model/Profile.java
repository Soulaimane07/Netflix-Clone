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
@Table(name="profiles")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="image")
    private String image;

    public Profile() {
    }

    public Profile(String image){
        super();
        this.image = image;
    }

    public int getId(){
        return id;
    }

    public String getImage(){
        return image;
    }
    
    public void setImage(String image){
        this.image = image;
    }
}
