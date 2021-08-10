package com.stackroute.feedbackservice.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.stackroute.feedbackservice.model.Feedback;

public interface FeedbackRepository extends MongoRepository<Feedback,Integer> {
	public List<Feedback> findByEmail(String email);
}
