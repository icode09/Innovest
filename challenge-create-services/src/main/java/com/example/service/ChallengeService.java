package com.example.service;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import com.example.model.Challenge;

public interface ChallengeService {
	
	public void createChallenge(Challenge ch);
	public Collection<Challenge> getAllChallenges();
	public Optional<Challenge> findChallengeById(String id);
	public void deleteChallengeById(String id);
	public void updateChallenge(Challenge ch);
	public void updateViews(String id);

}
