package com.example.demo.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="series")
public class Series {
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

    @Column(name="description")
    private String description;

    @Column(name="year")
    private Integer year;

    @Column(name="seasons")
    private Integer seasons;

    @ManyToMany
    private List<Gendre> genres;

    @ManyToOne
    @JoinColumn(name="networkid")
    private Network network;

    @ManyToMany
    private List<Actor> actors;


    public Series() {
    }

    public Series(String title, String logoimage, String cardimage, String bgimage, String rating, String desc, int year, int seasons, String trailer, List<Gendre> genre, List<Actor> actors, Network network){
        super();
        this.title = title;
        this.logoimage = logoimage;
        this.cardimage = cardimage;
        this.bgimage = bgimage;
        this.rating = rating;
        this.trailer = trailer;
        this.genres = genre;
        this.network = network;
        this.year = year;
        this.description = desc;
        this.seasons = seasons;
        this.actors = actors;
    }
}
