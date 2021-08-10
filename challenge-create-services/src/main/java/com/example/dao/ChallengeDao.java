package com.example.dao;
import org.springframework.data.mongodb.repository.MongoRepository;


import com.example.model.Challenge;

public interface ChallengeDao extends MongoRepository<Challenge, String> {

}

//comment
