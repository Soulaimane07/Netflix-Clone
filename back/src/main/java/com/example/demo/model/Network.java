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
@Table(name="networks")
public class Network {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="name")
    private String name;
    @Column(name="logourl")
    private String logourl;
    @Column(name="bgurl")
    private String bgurl;
    @Column(name="videourl")
    private String videourl;

    public Network() {
    }

    public Network(String name, String logourl, String bgurl, String videourl){
        super();
        this.name = name;
        this.logourl = logourl;
        this.bgurl = bgurl;
        this.videourl = videourl;
    }

    public int getId(){
        return id;
    }

    public String getName(){
        return name;
    }

    public String getLogourl(){
        return logourl;
    }
    
}