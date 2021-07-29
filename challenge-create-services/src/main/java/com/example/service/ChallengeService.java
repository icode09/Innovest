package com.example.service;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import com.example.model.Challenge;

public interface ChallengeService {
	
	public void createChallenge(Challenge ch);
	public Collection<Challenge> getAllChallenges();
	public Optional<Challenge> findChallengeById(UUID id);
	public void deleteChallengeById(UUID id);
	public void updateChallenge(Challenge ch);
	

}
