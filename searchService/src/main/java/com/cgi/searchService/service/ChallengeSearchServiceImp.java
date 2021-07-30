package com.cgi.searchService.service;

import com.google.gson.Gson;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.SimpleQueryStringBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cgi.searchService.document.ChallengeDoc;
import com.cgi.searchService.repositories.ChallengesRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ChallengeSearchServiceImp implements ChallengeSearchService {

	private static final String INDEX = "challenges";


	private RestHighLevelClient restHighLevelClient;

	public ChallengeSearchServiceImp (RestHighLevelClient restHighLevelClient) {
		this.restHighLevelClient = restHighLevelClient;
	}

	@Autowired
	private ChallengesRepository repo;
	
	
	public void addChallenge (ChallengeDoc challenge) {
		if(!repo.existsById(challenge.getChallengeId())) {
			repo.save(challenge);
		}
		
	}

	@Override
	public void addChallengesList(List<ChallengeDoc> challenges) {
		repo.saveAll(challenges);
	}

	public ChallengeDoc findById (String id) {
		return repo.findById(id).orElse(null);
	}


	@Override
	public List<ChallengeDoc> findByChallengeNameContaining(String name) {
		return null;
	}

	@Override
	public Iterable<ChallengeDoc> findAll() {
		return repo.findAll();
	}

	@Override
	public List<ChallengeDoc> findChallenge(String text) {
		try {
			SearchRequest request = new SearchRequest(INDEX);
			SearchSourceBuilder scb = new SearchSourceBuilder();
			SimpleQueryStringBuilder mcb = QueryBuilders.simpleQueryStringQuery(text);
			scb.query(mcb);
			request.source(scb);

			RequestOptions builder = RequestOptions.DEFAULT;

			SearchResponse response = restHighLevelClient.search(request,builder);
			SearchHits hits = response.getHits();
			SearchHit[] searchHits = hits.getHits();
			List<ChallengeDoc> challenges = new ArrayList(searchHits.length);
			for (SearchHit hit : searchHits) {
				String sourceAsString = hit.getSourceAsString();
				if (sourceAsString != null) {
					Gson gson = new Gson();
					challenges.add(gson.fromJson(sourceAsString, ChallengeDoc.class));
				}
			}
			return challenges;
		} catch (IOException ex) {
		}
		return Collections.emptyList();
	}

}
