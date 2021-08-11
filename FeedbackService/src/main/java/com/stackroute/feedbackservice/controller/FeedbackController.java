package com.stackroute.feedbackservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.feedbackservice.model.Feedback;
import com.stackroute.feedbackservice.service.RabbitMQSender;
import com.stackroute.feedbackservice.service.FeedbackService;

@RestController
@CrossOrigin(value = "*")
@RequestMapping("/api/v1/feedback")
public class FeedbackController {
	FeedbackService feedbackService;
	RabbitMQSender rabbitMQSender;

	@Autowired
	public FeedbackController(FeedbackService feedbackService, RabbitMQSender rabbitMQSender) {
		this.feedbackService = feedbackService;
		this.rabbitMQSender = rabbitMQSender;
	}

	@PostMapping("/feedback")
	public ResponseEntity<?> saveFeedback(@RequestBody Feedback feedback) {
		ResponseEntity<?> responseEntity;
		try {
			Feedback feedbackObj = null;
			feedbackObj = feedbackService.saveFeedback(feedback);
			rabbitMQSender.send(feedback);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception exc) {
			return new ResponseEntity<>(exc.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/feedbacks")
	public ResponseEntity<?> getData() {
		return new ResponseEntity<>("this is the feedbacks", HttpStatus.OK);
	}

}
