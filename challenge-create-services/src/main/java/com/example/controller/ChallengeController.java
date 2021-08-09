package com.example.controller;

import java.util.Collection;

import com.example.service.RabbitMQSender;
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

	private ChallengeService challengeService;
	private RabbitMQSender rabbitMQSender;

	@Autowired
	public ChallengeController(ChallengeService challengeService, RabbitMQSender rabbitMQSender) {
		this.challengeService=challengeService;
		this.rabbitMQSender=rabbitMQSender;
	}
	@PostMapping(value="/create")
    public Challenge createCh(@RequestBody Challenge ch)
	{
    	ch.setChallengeId(ch.getChallengeId());
		System.out.println("challenge got:"+ch.getChallengeName());
    	challengeService.createChallenge(ch);
    	rabbitMQSender.send(ch);
		return ch;
	}

    @GetMapping(value= "/getall")
    public Collection<Challenge> getAll() {
         return challengeService.getAllChallenges();
    }
    
}
