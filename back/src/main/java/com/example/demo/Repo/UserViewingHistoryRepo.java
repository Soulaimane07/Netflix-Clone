package com.example.demo.Repo;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.example.demo.model.UserViewingHistory;

public interface UserViewingHistoryRepo extends CassandraRepository<UserViewingHistory, UUID> {
    List<UserViewingHistory> findByProfileId(Integer profileId);
    Optional<UserViewingHistory> findByProfileIdAndContentIdAndContentType(Integer profileId, Integer integer, String contentType);
}