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
@Table(name="episodes")
public class Episode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="title")
    private String title;

    @Column(name="cardimage")
    private String cardimage;

    @Column(name="video")
    private String video;

    @Column(name="description")
    private String description;

    @ManyToOne
    @JoinColumn(name="serieId")
    private Series serie;

    @Column(name="season")
    private Integer season;

    @Column(name="episode")
    private Integer episode;



    public Episode() {
    }

    public Episode(String title, String cardimage, String desc, String video, Series serie, Integer episode, Integer season){
        super();
        this.title = title;
        this.cardimage = cardimage;
        this.video = video;
        this.description = desc;
        this.episode = episode;
        this.season = season;
        this.serie = serie;
    }

    public int getSerieId(){
        return serie.getId();
    }
}
