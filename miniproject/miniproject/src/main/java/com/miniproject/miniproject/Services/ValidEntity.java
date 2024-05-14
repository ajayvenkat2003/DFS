package com.miniproject.miniproject.Services;
import com.miniproject.miniproject.Entities.*;
import com.miniproject.miniproject.Exceptions.DemandNotFoundException;
import com.miniproject.miniproject.Exceptions.DemandSatisfiedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.*;

//service class to filter members and demands
@Component
public class ValidEntity {

    @Autowired
    private  RestServices restServices;
    //finds the demands that satisfies the given conditions
    public List<Demand> getDemande(DemandRequest dreq){
        List<Demand> li = new ArrayList<>();
        List<Demand> allDemands=restServices.allDemands();
        for(Demand demand: allDemands){
            if(dreq.getCity()!=null&&!demand.getCity().equals(dreq.getCity()))
                continue;
            if(dreq.getStatus()!=null&&!((Boolean)demand.isStatus()).equals(dreq.getStatus()))
                continue;
            if(dreq.getManager()!=null&&!demand.getManagerName().equals(dreq.getManager()))
                continue;
            if(dreq.getName()!=null&&!demand.getPName().equals(dreq.getName()))
                continue;
            li.add(demand);
        }
        return li;
    }

    //finds the members who satisfy the given conditions for the demand
    public List<Member> validMembers(MemberRequest dr, boolean isAssign)throws DemandSatisfiedException, DemandNotFoundException {
        List<Member> validMembers = new ArrayList<>();
        List<Member> members = restServices.allMembers();
        Demand demand = restServices.demandById(dr.getProjectId());
        if(isAssign&&demand.isStatus())
            throw  new DemandSatisfiedException("Demand satisfied already!!!");
        Map<Member,Integer> assignMembers=new HashMap<>();

        for (Member member : members) {
            int count=0;
            if (dr.getLevel()!=null && !member.getLevel().equals(demand.getLevel()))
                continue;

            if (dr.getCity()!=null&& !member.getLocation().equals(demand.getCity()))
                continue;
            if (dr.getSkills()!=null && !skillsMatch(demand.getSkills(),member.getSkills() ))
                continue;
            if (dr.getExp()!=null&&dr.getExp().compareTo(member.getExperience())==1)
                continue;
            if(member.getLevel().equals(demand.getLevel()))
                count++;
            if(member.getLocation().equals(demand.getCity()))
                count++;
            if(!member.isStatus()){
            assignMembers.put(member,count);
            validMembers.add(member);}
        }

        //sorts based on the DOJ
        Collections.sort(validMembers);
       List<Map.Entry<Member,Integer>> eset= new ArrayList<>(assignMembers.entrySet());

       //sorts based on the skills
       Collections.sort(eset, new Comparator<Map.Entry<Member, Integer>>() {
           @Override
           public int compare(Map.Entry<Member, Integer> o1, Map.Entry<Member, Integer> o2) {
               if(o1.getValue().equals(o2.getValue()))
                   return o1.getKey().compareTo(o2.getKey());
               return o1.getValue().compareTo(o2.getValue());
           }
       });

       List<Member> validMember2=new ArrayList<>();
       eset.stream().forEach(entry->validMember2.add(entry.getKey()));

       //demand assignment based on the skill level
        if(isAssign)
            return validMember2;
        //members in DOB order
        return validMembers;}

     private boolean skillsMatch(String s1,Map<String,Integer> s2){
            Set<String> l1=s2.keySet();
            List<String> l2= Arrays.asList(s1.split(","));
            for(String s:l2){
                if(!l1.contains(s))
                    return false;
            }
            return true;
        }



}
