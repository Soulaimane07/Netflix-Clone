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
    @JoinColumn(name="seasonId")
    private Season season;



    public Episode() {
    }

    public Episode(String title, String cardimage, String desc, String video, Season season){
        super();
        this.title = title;
        this.cardimage = cardimage;
        this.video = video;
        this.description = desc;
        this.season = season;
    }

    public int getSeasonId(){
        return season.getId();
    }
}
