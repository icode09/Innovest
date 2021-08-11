package com.cgi.searchService.document;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "challenges")
public class ChallengeDoc {
	
	@Id
	@Field(type = FieldType.Keyword)
	private String challengeId;
	
	@Field(type = FieldType.Keyword)
	private String challengerName;
	
	@Field(type = FieldType.Text)
	private String challengeName;
	
	@Field(type = FieldType.Text)
	private String description;
	
	@Field(type = FieldType.Text)
	private String rules;
	
	@Field(type = FieldType.Text)
	private String abstraction;
	
	@Field(type = FieldType.Date)
	private Date startDate;
	
	@Field(type = FieldType.Date)
	private Date endDate;
	
	@Field(type = FieldType.Boolean)
	private boolean paid;
	
	@Field(type = FieldType.Double)
	private double rewardPrize;
	
	@Field(type = FieldType.Byte)
	private Byte[] challengeImage;
	
	@Field(type = FieldType.Text)
	private String imageName;
	
	@Field(type = FieldType.Keyword)
	private String documentUrl;
	
	@Field(type = FieldType.Text)
	private String[] domain;
	
	@Field(type = FieldType.Integer)
	private int registrations;
	
	@Field(type = FieldType.Integer)
	private int views;

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

	public int getRegistrations() {
		return registrations;
	}

	public void setRegistrations(int registrations) {
		this.registrations = registrations;
	}

	public int getViews() {
		return views;
	}

	public void setViews(int views) {
		this.views = views;
	}
	

}

/* “challengeId”: UUID,
	“challengerId”: UUID,
	“challengeName”: String,
	“description”:String,
	“rules”:String,
	“abstraction”:String,
	“startDate”:Date,
	“endDate”: Date,
	“paid”:Boolean,
	“rewardPrize”:Double,
	“challengeImage”:Byte[],
	“imageName”:String,
	“documentUrl”:String,
	“domain”:String[],
	“registrations”:Integer,
	“views”:Integer,
*/
