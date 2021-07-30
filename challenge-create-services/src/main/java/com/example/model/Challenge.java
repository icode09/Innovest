package com.example.model;

import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection= "challenge")
public class Challenge {
	
	@Id
	private UUID challengeId;
	
	private UUID challengerId;
	private String challengeName;
	private String description;
	private String rules;
	private String abstraction;
	private Date startDate;
	private Date endDate;
	private boolean paid;
	private double rewardPrize;
	private Byte[] challengeImage;
	private String imageName;
	private String documentUrl;
	private String[] domain;
	private Integer registrations;
	private Integer views;
	
	public Challenge() {}

	public UUID getChallengeId() {
		return challengeId;
	}

	public void setChallengeId(UUID challengeId) {
		this.challengeId = challengeId;
	}

	public UUID getChallengerId() {
		return challengerId;
	}

	public void setChallengerId(UUID challengerId) {
		this.challengerId = challengerId;
	}

	public String getChallengeName() {
		return challengeName;
	}

	public void setChallengeName(String challengeName) {
		this.challengeName = challengeName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getRules() {
		return rules;
	}

	public void setRules(String rules) {
		this.rules = rules;
	}

	public String getAbstraction() {
		return abstraction;
	}

	public void setAbstraction(String abstraction) {
		this.abstraction = abstraction;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public boolean isPaid() {
		return paid;
	}

	public void setPaid(boolean paid) {
		this.paid = paid;
	}

	public double getRewardPrize() {
		return rewardPrize;
	}

	public void setRewardPrize(double rewardPrize) {
		this.rewardPrize = rewardPrize;
	}

	public Byte[] getChallengeImage() {
		return challengeImage;
	}

	public void setChallengeImage(Byte[] challengeImage) {
		this.challengeImage = challengeImage;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public String getDocumentUrl() {
		return documentUrl;
	}

	public void setDocumentUrl(String documentUrl) {
		this.documentUrl = documentUrl;
	}

	public String[] getDomain() {
		return domain;
	}

	public void setDomain(String[] domain) {
		this.domain = domain;
	}

	public Integer getRegistrations() {
		return registrations;
	}

	public void setRegistrations(Integer registrations) {
		this.registrations = registrations;
	}

	public Integer getViews() {
		return views;
	}

	public void setViews(Integer views) {
		this.views = views;
	}

	@Override
	public String toString() {
		return "challenge [challengeId=" + challengeId + ", challengerId=" + challengerId + ", challengeName="
				+ challengeName + ", description=" + description + ", rules=" + rules + ", abstraction=" + abstraction
				+ ", startDate=" + startDate + ", endDate=" + endDate + ", paid=" + paid + ", rewardPrize="
				+ rewardPrize + ", challengeImage=" + Arrays.toString(challengeImage) + ", imageName=" + imageName
				+ ", documentUrl=" + documentUrl + ", domain=" + Arrays.toString(domain) + ", registrations="
				+ registrations + ", views=" + views + "]";
	}
	
}
