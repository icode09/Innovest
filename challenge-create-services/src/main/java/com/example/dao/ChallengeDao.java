package com.example.dao;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.UUID;


import com.example.model.Challenge;

public interface ChallengeDao extends MongoRepository<Challenge, UUID> {

}
