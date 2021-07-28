package com.innovest.solution.model;

import org.springframework.data.annotation.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.lang.Nullable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.UUID;

@Data
@Document(collection= "solution")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Solution {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	private UUID solutionId;
	@ManyToOne
	private UUID challengeId;
	@ManyToOne
	private UUID solvedBy;
	@NotBlank(message="Solution title cannot be blank or null")
	private String solutionTitle;
	@Lob
	@NotBlank(message="Solution description cannot be blank or null")
	private String solutionDescription;
	@Nullable
	private String documentUrl;
	@Nullable
	private String codeUrl;
	@Nullable
	private SolutionStatus solutionStatus;
	
	public UUID getSolutionId() {
		return solutionId;
	}
	public void setSolutionId(UUID solutionId) {
		this.solutionId = solutionId;
	}
	public UUID getChallengeId() {
		return challengeId;
	}
	public void setChallengeId(UUID challengeId) {
		this.challengeId = challengeId;
	}
	public UUID getSolvedBy() {
		return solvedBy;
	}
	public void setSolvedBy(UUID solvedBy) {
		this.solvedBy = solvedBy;
	}
	public String getSolutionTitle() {
		return solutionTitle;
	}
	public void setSolutionTitle(String solutionTitle) {
		this.solutionTitle = solutionTitle;
	}
	public String getSolutionDescription() {
		return solutionDescription;
	}
	public void setSolutionDescription(String solutionDescription) {
		this.solutionDescription = solutionDescription;
	}
	public String getDocumentUrl() {
		return documentUrl;
	}
	public void setDocumentUrl(String documentUrl) {
		this.documentUrl = documentUrl;
	}
	public String getCodeUrl() {
		return codeUrl;
	}
	public void setCodeUrl(String codeUrl) {
		this.codeUrl = codeUrl;
	}
	public SolutionStatus getSolutionStatus() {
		return solutionStatus;
	}
	public void setSolutionStatus(SolutionStatus solutionStatus) {
		this.solutionStatus = solutionStatus;
	}
}
