package com.miniproject.miniproject.Controllers;

import com.miniproject.miniproject.Entities.*;
import com.miniproject.miniproject.Exceptions.DemandNotFoundException;
import com.miniproject.miniproject.Exceptions.DemandSatisfiedException;
import com.miniproject.miniproject.Exceptions.NoEntityFoundException;
import com.miniproject.miniproject.Services.RestServices;
import com.miniproject.miniproject.Services.ValidEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
public class RestControl {

    @Autowired
    ValidEntity validEntity;
    @Autowired
    private RestServices restService;

    @PostMapping("/adddemand")
    public ResponseEntity<Demand> addDemand(@RequestBody Demand demand){
        demand.setStatus(false);
        return ResponseEntity.status(HttpStatus.OK).body(restService.addDemand(demand));
    }
    @PostMapping("/addmember")
    public ResponseEntity<Member> addMember(@RequestBody Member member){
        member.setStatus(false);
        return ResponseEntity.status(HttpStatus.OK).body(restService.addMember(member));
    }

    @GetMapping("/alldemands")
    public ResponseEntity<List<Demand>> allDemands(){
        return ResponseEntity.status(HttpStatus.OK).body(restService.allDemands());
    }

    @GetMapping("/allmembers")
    public ResponseEntity<List<Member>> allMembers(){
         return ResponseEntity.status(HttpStatus.OK).body(restService.allMembers());
    }

    @PostMapping("/validmembers")
    public ResponseEntity<List<Member>> validMember(@RequestBody MemberRequest dr)throws DemandSatisfiedException, DemandNotFoundException, NoEntityFoundException {
        if(dr.getProjectId()==null)
            throw  new NoEntityFoundException("project id should not be null");
        List<Member>  li= validEntity.validMembers(dr,false);
        if(li.size()==0)
            throw new NoEntityFoundException("No valid members found");
        return ResponseEntity.status(HttpStatus.OK).body(li);
    }

    @PostMapping("/assign")
    public ResponseEntity<Member> assignMember(@RequestBody MemberRequest dr)throws DemandSatisfiedException, DemandNotFoundException, NoEntityFoundException {
        if(dr.getProjectId()==null)
            throw  new NoEntityFoundException("project id should not be null");
        List<Member> vMembers = validEntity.validMembers(dr,true);
        if(vMembers.size()<=0)
            throw new NoEntityFoundException("No valid member found");
        restService.update(vMembers.get(0),dr.getProjectId());
        return ResponseEntity.status(HttpStatus.OK).body(vMembers.get(0));
    }

    @PostMapping("/getdemand")
    public ResponseEntity<List<Demand>>assignMember(@RequestBody DemandRequest dr)throws NoEntityFoundException{
       List<Demand> li = validEntity.getDemande(dr);
       if(li.size()==0)
           throw new NoEntityFoundException("No valid Demand Found");
        return ResponseEntity.status(HttpStatus.OK).body(li);
    }




}
