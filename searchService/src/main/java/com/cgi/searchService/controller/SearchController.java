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

@RestController
@RequestMapping("/challenges")
public class SearchController {
	
	private final ChallengeSearchService service;
	
	@Autowired
	public SearchController(ChallengeSearchService service) {
		this.service = service;
	}
	
	@PostMapping("/addchallenge")
	public void add(@RequestBody final ChallengeDoc challenge) {
		service.addChallenge(challenge);
	}
	
	@GetMapping("/{challengeId}")
	public ChallengeDoc findById(@PathVariable final String challengeId) {
		return service.findById(challengeId);
	}
	

}
