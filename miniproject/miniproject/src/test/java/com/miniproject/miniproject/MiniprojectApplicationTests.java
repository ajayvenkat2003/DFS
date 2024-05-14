package com.miniproject.miniproject;

import com.miniproject.miniproject.Entities.Demand;
import com.miniproject.miniproject.Entities.DemandRequest;
import com.miniproject.miniproject.Entities.Member;
import com.miniproject.miniproject.Entities.MemberRequest;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@SpringBootTest
class MiniprojectApplicationTests {
	@Autowired
	RestTemplate testRestTemplate;
	@Test
	void endpointsTest() throws JSONException {
		JSONObject obj = new JSONObject();
		obj.put("level","P09");
		HttpHeaders header = new HttpHeaders();
		HttpEntity<String> request =
				new HttpEntity<String>(obj.toString(), header);
		Member m=new Member();
		Demand d=new Demand();

		d.setCity("pune");
		m.setLevel("P09");
		ResponseEntity<Member> memberReceived =testRestTemplate
				.postForEntity("http://localhost:8080/project/addmember",m,
				Member.class);
		ResponseEntity<Demand>  demandReceived=testRestTemplate
				.postForEntity("http://localhost:8080/project/adddemand",d,
						Demand.class);
		Assertions.assertEquals(HttpStatus.OK,testRestTemplate.getForEntity("http://localhost:8080/project/alldemands", List.class).getStatusCode());
		Assertions.assertEquals(HttpStatus.OK,testRestTemplate.getForEntity("http://localhost:8080/project/allmembers", List.class).getStatusCode());
		Assertions.assertEquals(memberReceived.getStatusCode(),HttpStatus.OK);
		Assertions.assertEquals(demandReceived.getStatusCode(),HttpStatus.OK);
		MemberRequest mr = new MemberRequest();
		mr.setProjectId(23);
		Assertions.assertEquals(HttpStatus.OK,testRestTemplate.postForEntity("http://localhost:8080/project/validmembers",mr, List.class).getStatusCode());
		Assertions.assertEquals(HttpStatus.OK,testRestTemplate.postForEntity("http://localhost:8080/project/assign",mr, List.class).getStatusCode());
		Assertions.assertEquals(HttpStatus.OK,testRestTemplate.postForEntity("http://localhost:8080/project/getdemand",new DemandRequest(), List.class).getStatusCode());
	}

}
