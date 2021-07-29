package com.cgi.searchService.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cgi.searchService.document.ChallengeDoc;
import com.cgi.searchService.repositories.ChallengesRepository;

import java.util.List;

@Service
public class ChallengeSearchServiceImp implements ChallengeSearchService {
	
	@Autowired
	private ChallengesRepository repo;
	
	
	public void addChallenge (ChallengeDoc challenge) {
		if(!repo.existsById(challenge.getChallengeId())) {
			repo.save(challenge);
		}
		
	}

	@Override
	public void addChallengesList(List<ChallengeDoc> challenges) {
		repo.saveAll(challenges);
	}

	public ChallengeDoc findById (String id) {
		return repo.findById(id).orElse(null);
	}


	@Override
	public List<ChallengeDoc> findByChallengeNameContaining(String name) {
		return null;
	}

	@Override
	public Iterable<ChallengeDoc> findAll() {
		return repo.findAll();
	}

}
