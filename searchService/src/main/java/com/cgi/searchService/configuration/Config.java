package com.cgi.searchService.configuration;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@EnableElasticsearchRepositories(basePackages = "com.cgi.searchService.repositories")
@ComponentScan(basePackages = {"com.cgi.searchService.repositories"})
public class Config extends AbstractElasticsearchConfiguration {
	
	@Value("${elasticsearch.url}")
	public String elasticsearchUrl;

	@Override
	public RestHighLevelClient elasticsearchClient() {
		
		return null;
	}

}
