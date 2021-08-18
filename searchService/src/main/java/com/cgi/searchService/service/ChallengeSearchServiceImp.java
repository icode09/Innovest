package com.cgi.searchService.service;

import com.google.gson.*;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RegexpQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.cgi.searchService.document.ChallengeDoc;
import com.cgi.searchService.repositories.ChallengesRepository;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.*;
import java.util.stream.Collectors;

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
	public void DeleteById(String id) {
		repo.deleteById(id);
	}

	@Override
	public void DeleteAll() {
		repo.deleteAll();
	}

	@Override
	public Iterable<ChallengeDoc> findAll() {
		return repo.findAll();
	}

	@Override
	public Iterable<ChallengeDoc> findChallenge(String text) {
		try {
			SearchRequest request = new SearchRequest(INDEX);
			SearchSourceBuilder ssb = new SearchSourceBuilder();
			//SimpleQueryStringBuilder sqsb = QueryBuilders.simpleQueryStringQuery(text);
			String reg = ".*" + text + ".*" ;
			RegexpQueryBuilder sqsb = QueryBuilders.regexpQuery("challengeName", reg);
			ssb.query(sqsb);
			request.source(ssb);

			RequestOptions builder = RequestOptions.DEFAULT;

			SearchResponse response = restHighLevelClient.search(request,builder);
			SearchHits hits = response.getHits();
			SearchHit[] searchHits = hits.getHits();
			List<ChallengeDoc> challenges = new ArrayList(searchHits.length);
			for (SearchHit hit : searchHits) {
				String sourceAsString = hit.getSourceAsString();
				if (sourceAsString != null) {
					final Gson gson = new GsonBuilder()
							.registerTypeAdapter(Date.class, new JsonDeserializer<Date>() {
								public Date deserialize(JsonElement jsonElement, Type type, JsonDeserializationContext context) throws JsonParseException {
									return new Date(jsonElement.getAsJsonPrimitive().getAsLong());
								}
							})
							.create();
					challenges.add(gson.fromJson(sourceAsString, ChallengeDoc.class));
				}
			}
			Iterable<ChallengeDoc> results = challenges;
			return results;
		} catch (IOException ex) {
		}
		Iterable<ChallengeDoc> empty = Collections.emptyList();
		return empty;
	}

	@Override
	public Iterable<ChallengeDoc> findByChallengeName(String challengeName) {
		return repo.findByChallengeName(challengeName);
	}

	@Override
	public Iterable<ChallengeDoc> findByDomain(String domain) {
		return repo.findByDomain(domain);
	}

	// Recommended Challenges
	@Override
	public Iterable<ChallengeDoc> findByDomainList(String[] domainList, String userName) {
		Collection<ChallengeDoc> list = new ArrayList<>();
		for(String domain:domainList){
			list.addAll((Collection<ChallengeDoc>)repo.findByDomain(domain));
		}
		Set<String> challengeIdList = new HashSet<>();
		list.removeIf(ch -> !challengeIdList.add(ch.getChallengeId()));
		Collection<ChallengeDoc> newList = new ArrayList<>();
		list = list.stream()
					.filter(ch -> ch.getChallengerName() == null || !ch.getChallengerName().equals(userName))
					.collect(Collectors.toList());
		return list;
	}

	// Top Challenges
	@Override
	public Iterable<ChallengeDoc> findTopChallenges(Integer limit, String userName) {
		List<ChallengeDoc> list = (List<ChallengeDoc>) findChallenge("");
		list = list.stream()
				.sorted(Comparator.comparing(ChallengeDoc::getViews,Comparator.reverseOrder()))
				.limit(limit)
				.collect(Collectors.toList());
//		list.sort(Comparator.comparing(ChallengeDoc::getViews,Comparator.reverseOrder()));
		list = list.stream()
				.filter(ch -> ch.getChallengerName() == null || !ch.getChallengerName().equals(userName))
				.collect(Collectors.toList());
		return list;
	}

	// Recently added Challenges
	@Override
	public Iterable<ChallengeDoc> findLatestChallenges(Integer limit, String userName) {
		List<ChallengeDoc> list = (List<ChallengeDoc>) findChallenge("");
		list = list.stream()
				.sorted(Comparator.comparing(ChallengeDoc::getStartDate,Comparator.reverseOrder()))
				.limit(limit)
				.collect(Collectors.toList());
//		list.sort(Comparator.comparing(ChallengeDoc::getViews,Comparator.reverseOrder()));
		list = list.stream()
				.filter(ch -> ch.getChallengerName() == null || !ch.getChallengerName().equals(userName))
				.collect(Collectors.toList());
		return list;
	}

}
