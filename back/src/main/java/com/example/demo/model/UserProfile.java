package com.example.demo.model;

import java.util.ArrayList;
import java.util.Collections;
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
@Table(name="userprofile")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Person user;

    @ManyToOne
    @JoinColumn(name="profile_id")
    private Profile profile;

    @Column(name="name")
    private String name;

    @ManyToMany
    private List<Movie> favoriteMovies;

    @ManyToMany
    private List<Series> favoriteSeries;

    

    public UserProfile() {
    }

    public UserProfile(Person user, Profile profile, String name){
        super();
        this.user = user;
        this.profile = profile;
        this.name = name;
    }

    public Person getUser(){
        return this.user;
    }
    
    public void setUser(Person user){
        this.user = user;
    }

    public String getProfile(){
        return this.profile.getImage();
    }
    
    public void setProfile(Profile profile){
        this.profile = profile;
    }


    public List<Object> getCombinedWatchlist() {
        List<Object> combinedWatchlist = new ArrayList<>();
        
        // Handle cases where favoriteMovies or favoriteSeries might be null
        List<Movie> movies = favoriteMovies != null ? favoriteMovies : new ArrayList<>();
        List<Series> series = favoriteSeries != null ? favoriteSeries : new ArrayList<>();
        
        int movieSize = movies.size();
        int seriesSize = series.size();
        int maxSize = Math.max(movieSize, seriesSize);
    
        // Alternate between movies and series
        for (int i = 0; i < maxSize; i++) {
            if (i < movieSize) {
                combinedWatchlist.add(movies.get(i)); // Add movie
            }
            if (i < seriesSize) {
                combinedWatchlist.add(series.get(i)); // Add series
            }
        }

        Collections.reverse(combinedWatchlist);
        
        return combinedWatchlist;
    }
}
