package com.innovest.solution.model;


import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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

import java.util.ArrayList;
import java.util.List;
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
	private String solvedBy;
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
	@Nullable
	private byte[] fileByte;
	@Nullable
	private String fileName;
	private List<ReviewComment> reviewComments=new ArrayList<>();


}
