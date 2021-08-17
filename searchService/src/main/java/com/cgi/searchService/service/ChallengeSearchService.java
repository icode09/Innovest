package com.cgi.searchService.service;

import com.cgi.searchService.document.ChallengeDoc;

import java.util.List;

public interface ChallengeSearchService {
	
	public void addChallenge (ChallengeDoc challenge);

	public void addChallengesList (List<ChallengeDoc> challenges);

	public ChallengeDoc findById (String id);

	public void DeleteById (String id);

	public void DeleteAll();

	Iterable<ChallengeDoc> findAll();

	public Iterable<ChallengeDoc> findChallenge(String text);

	Iterable<ChallengeDoc> findByChallengeName(String challengeName);

	Iterable<ChallengeDoc> findByDomain(String domain);

	Iterable<ChallengeDoc> findByDomainList(String[] domainList,String userName);

	Iterable<ChallengeDoc> findTopChallenges(Integer limit, String userName);

	Iterable<ChallengeDoc> findLatestChallenges(Integer limit, String userName);
}
