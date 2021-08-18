package com.example.controller;

import java.io.IOException;
import java.util.Collection;

import com.example.service.RabbitMQSender;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.model.Challenge;
import com.example.service.ChallengeService;

@RestController
@CrossOrigin
@RequestMapping(value="/innovest/challenge")
public class ChallengeController {

	private ChallengeService challengeService;
	private RabbitMQSender rabbitMQSender;

	@Autowired
	public ChallengeController(ChallengeService challengeService, RabbitMQSender rabbitMQSender) {
		this.challengeService=challengeService;
		this.rabbitMQSender=rabbitMQSender;
	}
	/*@PostMapping(value="/create")
    public Challenge createCh(@RequestBody Challenge ch)
	{
    	ch.setChallengeId(ch.getChallengeId());
		System.out.println("challenge got:"+ch.getChallengerName());
		System.out.println("challenge:"+ch);
    	challengeService.createChallenge(ch);
    	rabbitMQSender.send(ch);
		return ch;
	}*/
	@CrossOrigin
	@PostMapping("/upload")
    public ResponseEntity<Challenge> uploadFile(@RequestParam(value = "file",required = false )MultipartFile file, @RequestParam(value = "input" )String input) throws IOException {
        Challenge ch = new ObjectMapper().readValue(input, Challenge.class);
        //System.out.println("challenge name:"+challengeObj.getChallengerName());
        System.out.println("challenge got:"+ch.getChallengerName());
        //System.out.println("challenge name:"+challengeObj.getChallengeTitle());
        System.out.println("file name:"+file.getOriginalFilename());
        ch.setFileByte(file.getBytes());
        ch.setFile(file.getOriginalFilename());
        String fileUrl = challengeService.uploadFile(file);
        final String response = "[" + file.getOriginalFilename() + "] uploaded successfully.";
        ch.setDocumentUrl(fileUrl);
        challengeService.createChallenge(ch);
        rabbitMQSender.send(ch); 
        return new ResponseEntity<Challenge>(ch, HttpStatus.OK);
        }

    @GetMapping(value= "/getall")
    public Collection<Challenge> getAll() {
         return challengeService.getAllChallenges();
    }
    @GetMapping(value = "/challenge/{id}")
    public ResponseEntity<Challenge> getById(@PathVariable String id){
    	return new ResponseEntity<Challenge>(challengeService.findChallengeById(id), HttpStatus.OK);
		
    }

	@PutMapping(value = "/updateviews/{id}")
	public void updateViews(@PathVariable String id){
		Challenge ch = challengeService.updateViews(id);
		rabbitMQSender.send(ch);
	}

}
