package com.stackroute.feedbackservice.service;

import com.stackroute.feedbackservice.model.Feedback;

public interface FeedbackService {
	public Feedback saveFeedback(Feedback feedback);
	public Feedback getUser(String emailId);
}
