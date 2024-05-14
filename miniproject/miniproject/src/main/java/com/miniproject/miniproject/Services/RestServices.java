package com.miniproject.miniproject.Services;

import com.miniproject.miniproject.Entities.Demand;
import com.miniproject.miniproject.Exceptions.DemandNotFoundException;
import com.miniproject.miniproject.Entities.Member;
import com.miniproject.miniproject.Respositories.DemandRepository;
import com.miniproject.miniproject.Respositories.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestServices {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private DemandRepository demandRepository;
    public Demand addDemand(Demand demand) {
        return demandRepository.save(demand);
    }

    public Member addMember(Member member) {
        return memberRepository.save(member);
    }

    public List<Demand> allDemands() {
        return demandRepository.findAll();
    }
    public Demand demandById(Integer id)throws DemandNotFoundException {
        Optional<Demand> op = demandRepository.findById(id);
        if(!op.isPresent())
            throw new DemandNotFoundException("Demand Not Found");
        return op.get();
    }

    public List<Demand> allDeamnds() {return demandRepository.findAll();}
    public List<Member> allMembers() {
        return memberRepository.findAll();
    }

    public void update(Member mem, Integer projectId) {
        Member member = memberRepository.findById(mem.getMId()).get();
        member.setStatus(true);
        memberRepository.save(member);
        Demand demand = demandRepository.findById(projectId).get();
        demand.setStatus(true);
        demandRepository.save(demand);
    }
}
