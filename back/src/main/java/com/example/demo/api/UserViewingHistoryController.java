package com.example.demo.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repo.MovieRepo;
import com.example.demo.Repo.SerieRepo;
import com.example.demo.Repo.UserViewingHistoryRepo;
import com.example.demo.model.Movie;
import com.example.demo.model.Series;
import com.example.demo.model.UserViewingHistory;

@RequestMapping("api/v1/userviewing")
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://d22pl7wi9vfqrc.cloudfront.net"})
public class UserViewingHistoryController {
    @Autowired
    UserViewingHistoryRepo repo;

    @Autowired
    MovieRepo movieRepo;

    @Autowired
    SerieRepo serieRepo;

    


    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public UserViewingHistory addProfile(@RequestBody UserViewingHistory userViewingHistory) {
        userViewingHistory.setId(UUID.randomUUID());
        return repo.save(userViewingHistory);
    }


    // @GetMapping(path = "profile/{profileid}")
    // public List<UserViewingHistory> getAllProfiles(@PathVariable("profileid") Integer profileid) {
    //     List<UserViewingHistory> allRecords = repo.findAll(); // Fetch all records
    //     return allRecords.stream()
    //                     .filter(record -> profileid.equals(record.getProfileId()))
    //                     .collect(Collectors.toList());
    // }

    @GetMapping("profile/{profileId}")
    public List<Map<String, Object>> getProfileViewingHistory(@PathVariable Integer profileId) {
        List<UserViewingHistory> historyList = repo.findAll().stream()
                                                    .filter(record -> profileId.equals(record.getProfileId()))
                                                    .collect(Collectors.toList());

        List<Map<String, Object>> result = new ArrayList<>();

        for (UserViewingHistory history : historyList) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("userViewingHistory", history);

            if ("movie".equals(history.getContentType())) {
                Movie movie = movieRepo.findById(history.getContentId()).orElse(null);
                if (movie != null) {
                    entry.put("movie", movie);
                }
            } else if ("series".equals(history.getContentType())) {
                Series series = serieRepo.findById(history.getContentId()).orElse(null);
                if (series != null) {
                    entry.put("series", series);
                }
            }

            result.add(entry);
        }
        return result;
    }


    
    @PostMapping("/userviewing")
    public ResponseEntity<UserViewingHistory> createOrUpdateUserViewingHistory(@RequestBody UserViewingHistory viewingHistory) {
        Optional<UserViewingHistory> existingRecord = repo.findByProfileIdAndContentIdAndContentType(
            viewingHistory.getProfileId(), 
            viewingHistory.getContentId(), 
            viewingHistory.getContentType()
        );

        UserViewingHistory updatedRecord;
        
        if (existingRecord.isPresent()) {
            // Update the existing record
            UserViewingHistory record = existingRecord.get();
            record.setDurationWatched(viewingHistory.getDurationWatched());
            record.setFinished(viewingHistory.isFinished());
            record.setStartedAt(viewingHistory.getStartedAt());
            updatedRecord = repo.save(record);
        } else {
            // Create a new record
            updatedRecord = repo.save(viewingHistory);
        }

        return ResponseEntity.ok(updatedRecord);
    }




    // @PostMapping
    // public UserViewingHistory createProfileViewingHistory(@RequestBody UserViewingHistory profileViewingHistory) {
    //     return repo.save(profileViewingHistory);
    // }

    @GetMapping("/{id}")
    public UserViewingHistory getProfileViewingHistory(@PathVariable UUID id) {
        return repo.findById(id).orElse(null);
    }





    @DeleteMapping(path = "{id}")
    public void deleteProfileById(@PathVariable("id") UUID id){
        repo.deleteById(id);
    }
}
