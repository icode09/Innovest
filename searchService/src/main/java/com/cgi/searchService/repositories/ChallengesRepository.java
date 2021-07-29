package com.cgi.searchService.repositories;

import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import com.cgi.searchService.document.ChallengeDoc;

@Repository
public interface ChallengesRepository extends ElasticsearchRepository<ChallengeDoc, String> {

}
