package com.cgi.searchService.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cgi.searchService.document.ChallengeDoc;
import com.cgi.searchService.service.ChallengeSearchService;

import java.util.List;

@RestController
@CrossOrigin
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

	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable String id) { service.DeleteById(id);}

	@GetMapping("/search/{queries}")
	public Iterable<ChallengeDoc> ChallengeSearch(@PathVariable String queries)  {
		return service.findChallenge(queries);
	}

	@GetMapping("/getAll")
	public Iterable<ChallengeDoc> getAll() {
		return service.findAll();
	}
	

}
