package com.example.demo.model;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("profile_viewing_history")
public class UserViewingHistory {
    @PrimaryKey
    private UUID id; 

    @Column("profile_id")
    private Integer profileId; 

    @Column("content_type")
    private String contentType; 

    @Column("content_id")
    private Integer contentId; 

    @Column("episode_id")
    private Integer episodeId; 

    @Column("started_at")
    private LocalDateTime startedAt; 
    
    @Column("duration_watched")
    private Duration durationWatched;

    @Column("finished")
    private Boolean finished; 




    public UserViewingHistory() {
    }

    public UserViewingHistory(UUID id, Integer profileId, Integer contentId, Integer episodeId, LocalDateTime startedAt, Duration durationWatched, Boolean finished){
        super();
        this.id = id;
        this.profileId = profileId;
        this.contentId = contentId;
        this.episodeId = episodeId;
        this.startedAt = startedAt;
        this.durationWatched = durationWatched;
        this.finished = finished;
    }


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Integer getProfileId() {
        return profileId;
    }

    public void setProfileId(Integer profileId) {
        this.profileId = profileId;
    }

    public Integer getContentId() {
        return contentId;
    }

    public void setContentId(Integer contentId) {
        this.contentId = contentId;
    }

    public Integer getEpisodeId() {
        return episodeId;
    }

    public void setEpisodeId(Integer episodeId) {
        this.episodeId = episodeId;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public Duration getDurationWatched() {
        return durationWatched;
    }

    public void setDurationWatched(Duration durationWatched) {
        this.durationWatched = durationWatched;
    }

    public Boolean getFinished() {
        return finished;
    }

    public void setFinished(Boolean finished) {
        this.finished = finished;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Boolean isFinished() {
        return this.finished;
    }
}