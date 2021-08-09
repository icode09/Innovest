package com.stackroute.registrationservice.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;


@Data
@Document(collection = "users")
public class User {
    @Id
    private UUID userId;
	private String email;
	private String displayName;
    private String password;
    private String[] domain;
    private String bio;


	public User(UUID userId, String displayName, String email, String password, String[] domain, String bio) {
		super();
		this.userId = userId;
		this.displayName = displayName;
		this.email = email;
		this.password = password;
		this.domain = domain;
		this.bio = bio;
	}
	public User() {
		// TODO Auto-generated constructor stub
	}
	public UUID getUserId() {
		return userId;
	}
	public void setUserId(UUID userId) {
		this.userId = userId;
	}
	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String[] getDomain() {
		return domain;
	}
	public void setDomain(String[] domain) {
		this.domain = domain;
	}
	public String getBio() {
		return bio;
	}
	public void setBio(String bio) {
		this.bio = bio;
	}
}
