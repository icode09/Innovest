package com.cgi.searchService.repositories;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.cgi.searchService.document.ChallengeDoc;

public interface ChallengesRepository extends ElasticsearchRepository<ChallengeDoc, String> {

}
