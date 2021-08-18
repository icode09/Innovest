package com.example.model;

import java.util.Arrays;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection= "challenge")
public class Challenge {
	
	@Id
	private String challengeId;
	
	private String challengerName;
	private String challengeName;
	private String description;
	private String rules;
	private String abstraction;
	private Date startDate;
	private Date endDate;
	private boolean paid;
	private double rewardPrize;
	private Integer[] challengeImage;
	private String imageName;
	private String documentUrl;
	private String[] domain;
	private Integer registrations;
	private Integer views;
	private String registrationType;
	private String participationType;
	private byte[] fileByte;
	private String file;

	public byte[] getFileByte() {
		return fileByte;
	}

	public void setFileByte(byte[] fileByte) {
		this.fileByte = fileByte;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public Challenge() {
	}

	public Challenge(String challengeId, String challengerName, String challengeName, String description, String rules,
			String abstraction, Date startDate, Date endDate, boolean paid, double rewardPrize,
			Integer[] challengeImage, String imageName, String documentUrl, String[] domain, Integer registrations,
			Integer views, String registrationType, String participationType, byte[] fileByte, String file) {
		
		this.challengeId = challengeId;
		this.challengerName = challengerName;
		this.challengeName = challengeName;
		this.description = description;
		this.rules = rules;
		this.abstraction = abstraction;
		this.startDate = startDate;
		this.endDate = endDate;
		this.paid = paid;
		this.rewardPrize = rewardPrize;
		this.challengeImage = challengeImage;
		this.imageName = imageName;
		this.documentUrl = documentUrl;
		this.domain = domain;
		this.registrations = registrations;
		this.views = views;
		this.registrationType = registrationType;
		this.participationType = participationType;
		this.fileByte = fileByte;
		this.file = file;
	}

	

	public String getChallengeId() {
		return challengeId;
	}

	public void setChallengeId(String challengeId) {
		this.challengeId = challengeId;
	}

	public String getChallengerName() {
		return challengerName;
	}

	public void setChallengerName(String challengerName) {
		this.challengerName = challengerName;
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

	public Integer[] getChallengeImage() {
		return challengeImage;
	}

	public void setChallengeImage(Integer[] challengeImage) {
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

	public String getRegistrationType() {
		return registrationType;
	}

	public void setRegistrationType(String registrationType) {
		this.registrationType = registrationType;
	}

	public String getParticipationType() {
		return participationType;
	}

	public void setParticipationType(String participationType) {
		this.participationType = participationType;
	}

	@Override
	public String toString() {
		return "Challenge{" +
				"challengeId='" + challengeId + '\'' +
				", challengerName='" + challengerName + '\'' +
				", challengeName='" + challengeName + '\'' +
				", description='" + description + '\'' +
				", rules='" + rules + '\'' +
				", abstraction='" + abstraction + '\'' +
				", startDate=" + startDate +
				", endDate=" + endDate +
				", paid=" + paid +
				", rewardPrize=" + rewardPrize +
				", challengeImage=" + Arrays.toString(challengeImage) +
				", imageName='" + imageName + '\'' +
				", documentUrl='" + documentUrl + '\'' +
				", domain=" + Arrays.toString(domain) +
				", registrations=" + registrations +
				", views=" + views +
				", registrationType='" + registrationType + '\'' +
				", participationType='" + participationType + '\'' +
				'}';
	}
}
