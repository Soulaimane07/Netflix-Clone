package com.example.demo.model;

import java.time.Duration;
import java.time.LocalDateTime;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("user_viewing_history")
public class UserViewingHistory {
    @PrimaryKey
    private Integer id; 

    @Column("user_id")
    private Integer userId; 

    @Column("content_id")
    private Integer contentId; 

    @Column("content_type")
    private String contentType; 

    @Column("viewed_at")
    private LocalDateTime viewedAt; 

    @Column("duration_watched")
    private Duration durationWatched;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getContentId() {
        return contentId;
    }

    public void setContentId(Integer contentId) {
        this.contentId = contentId;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public LocalDateTime getViewedAt() {
        return viewedAt;
    }

    public void setViewedAt(LocalDateTime viewedAt) {
        this.viewedAt = viewedAt;
    }

    public Duration getDurationWatched() {
        return durationWatched;
    }

    public void setDurationWatched(Duration durationWatched) {
        this.durationWatched = durationWatched;
    }
}