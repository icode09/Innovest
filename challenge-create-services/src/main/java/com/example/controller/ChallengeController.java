package com.example.controller;

import java.util.Collection;

import com.example.service.RabbitMQSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
		System.out.println("challenge got:"+ch.getChallengerName());
		System.out.println("challenge:"+ch);
    	challengeService.createChallenge(ch);
    	rabbitMQSender.send(ch);
		return ch;
	}

    @GetMapping(value= "/getall")
    public Collection<Challenge> getAll() {
         return challengeService.getAllChallenges();
    }

	@PutMapping(value = "/updateviews/{id}")
	public void updateViews(@PathVariable String id, @RequestBody Challenge ch){
		challengeService.updateViews(id);
	}

}
