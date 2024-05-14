package com.miniproject.miniproject.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DemandRequest {
    private String city;
    private String manager;
    private String name;
    private Boolean status;
}
