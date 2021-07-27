package com.cgi.searchService.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cgi.searchService.document.ChallengeDoc;
import com.cgi.searchService.repositories.ChallengesRepository;

@Service
public class ChallengeSearchService {

	private final ChallengesRepository repo;
	
	@Autowired
	public ChallengeSearchService (ChallengesRepository repo) {
		this.repo = repo;
	}
	
	public void addChallenge (ChallengeDoc challenge) {
		if(!repo.existsById(challenge.getChallengeId())) {
			repo.save(challenge);
		}
		
	}
	
	public ChallengeDoc findById (String id) {
		return repo.findById(id).orElse(null);
	}
	
}
