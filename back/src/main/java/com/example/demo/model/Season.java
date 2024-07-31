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
@Table(name="seasons")
public class Season {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="episodes")
    private int episodes;

    @Column(name="year")
    private int year;

    public Season() {
    }

    public Season(int episodes, int year){
        super();
        this.episodes = episodes;
        this.year = year;
    }
}
