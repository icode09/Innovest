package com.cgi.searchService.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cgi.searchService.document.ChallengeDoc;
import com.cgi.searchService.service.ChallengeSearchService;

import java.util.List;

@RestController
@RequestMapping("/api/challenge")
public class SearchController {
	
	@Autowired
	private ChallengeSearchService service;
	
	
	@PostMapping
	public void add(@RequestBody ChallengeDoc challenge) {
		service.addChallenge(challenge);
	}

	@PostMapping("/addAll")
	public void addAll(@RequestBody List<ChallengeDoc> challenges) { service.addChallengesList(challenges);}
	
	@GetMapping("/{challengeId}")
	public ChallengeDoc findById(@PathVariable String challengeId) {
		return service.findById(challengeId);
	}

	/*
	@GetMapping("/findBy/{challengeName}")
	public List<ChallengeDoc> findByName(@PathVariable String challengeName) {
		return service.findByChallengeName(challengeName);
	} */

	@GetMapping("/search/{queries}")
	public List<ChallengeDoc> ChallengeSearch(@PathVariable String queries)  {
		return service.findChallenge(queries);
	}

	@GetMapping("/getAll")
	public Iterable<ChallengeDoc> getAll() {
		return service.findAll();
	}
	

}
