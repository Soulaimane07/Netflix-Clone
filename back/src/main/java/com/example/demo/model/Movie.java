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
@Table(name="movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="title")
    private String title;

    @Column(name="logoimage")
    private String logoimage;

    @Column(name="cardimage")
    private String cardimage;

    @Column(name="bgimage")
    private String bgimage;

    @Column(name="rating")
    private String rating;
    
    @Column(name="trailer")
    private String trailer;

    @Column(name="video")
    private String video;

    @ManyToOne
    @JoinColumn(name="genreid")
    private Gendre genre;

    @ManyToOne
    @JoinColumn(name="networkid")
    private Network network;

    public Movie() {
    }

    public Movie(String title, String logoimage, String cardimage, String bgimage, String rating, String trailer, String video, Gendre genre, Network network){
        super();
        this.title = title;
        this.logoimage = logoimage;
        this.cardimage = cardimage;
        this.bgimage = bgimage;
        this.rating = rating;
        this.trailer = trailer;
        this.video = video;
        this.genre = genre;
        this.network = network;
    }
    
}
