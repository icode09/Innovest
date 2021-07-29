package com.cgi.searchService.service;

import com.cgi.searchService.document.ChallengeDoc;

import java.util.List;

public interface ChallengeSearchService {
	
	public void addChallenge (ChallengeDoc challenge);

	public void addChallengesList (List<ChallengeDoc> challenges);

	public ChallengeDoc findById (String id);

	List<ChallengeDoc> findByChallengeNameContaining (String name);

	Iterable<ChallengeDoc> findAll();

}
