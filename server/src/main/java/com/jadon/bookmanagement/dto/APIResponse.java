package com.jadon.bookmanagement.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class APIResponse<T>{

    private String status;
    private T results;
    private String errorMessage;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int totalPage;

}
