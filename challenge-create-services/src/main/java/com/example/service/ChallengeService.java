package com.example.service;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.example.model.Challenge;

public interface ChallengeService {
	
	public void createChallenge(Challenge ch);
	public Collection<Challenge> getAllChallenges();
	public Challenge findChallengeById(String id);
	public void deleteChallengeById(String id);
	public void updateChallenge(Challenge ch);
	public Challenge updateViews(String id);
	public String uploadFile(MultipartFile multipartFile);
}
