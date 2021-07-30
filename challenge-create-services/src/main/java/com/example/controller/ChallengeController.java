package com.example.controller;

import java.util.Collection;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Challenge;
import com.example.service.ChallengeService;

@RestController
@CrossOrigin
@RequestMapping(value="innovest/challenge")
public class ChallengeController {
	
	@Autowired
	ChallengeService serv;
	
	@PostMapping(value="/create")
    public Challenge createCh(@Valid @RequestBody Challenge ch)
	{
    	ch.setChallengeId(ch.getChallengeId());
    	serv.createChallenge(ch);
		return ch;
	}

    @GetMapping(value= "/getall")
    public Collection<Challenge> getAll() {
         return serv.getAllChallenges();
    }
    
}
