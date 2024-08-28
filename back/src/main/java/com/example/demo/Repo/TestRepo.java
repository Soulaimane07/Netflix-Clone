package com.example.demo.Repo;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.example.demo.model.Test;

public interface TestRepo extends CassandraRepository<Test, String> {
    // your query methods
}