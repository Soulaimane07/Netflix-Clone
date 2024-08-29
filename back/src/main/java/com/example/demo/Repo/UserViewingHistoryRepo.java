package com.example.demo.Repo;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.example.demo.model.UserViewingHistory;

public interface UserViewingHistoryRepo extends CassandraRepository<UserViewingHistory, Integer> {
}
