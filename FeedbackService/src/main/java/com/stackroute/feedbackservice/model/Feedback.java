package com.stackroute.feedbackservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "reviews")
public class Feedback {
	private String name;
	private String email;
	private String subject;

	public Feedback(String name, String email, String subject) {
		super();
		this.name = name;
		this.email = email;
		this.subject = subject;
	}

	public Feedback() {
		// TODO Auto-generated constructor stub
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}
	
	
}
