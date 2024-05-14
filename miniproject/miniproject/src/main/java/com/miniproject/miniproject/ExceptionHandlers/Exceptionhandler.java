package com.miniproject.miniproject.ExceptionHandlers;


import com.miniproject.miniproject.Exceptions.DemandNotFoundException;
import com.miniproject.miniproject.Exceptions.DemandSatisfiedException;
import com.miniproject.miniproject.Exceptions.NoEntityFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@ResponseStatus
public class Exceptionhandler {

    @ExceptionHandler(value=DemandSatisfiedException.class)
    public ResponseEntity<String> demandSatisfiedExceptionHandler(DemandSatisfiedException ds){
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(ds.getMessage());
    }
    @ExceptionHandler(value = DemandNotFoundException.class)
    public ResponseEntity<String> demandNotFoundExceptionHandler(DemandNotFoundException ds){
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(ds.getMessage());
    }
    @ExceptionHandler(value = NoEntityFoundException.class)
    public ResponseEntity<String> noMemberException(NoEntityFoundException nme){
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(nme.getMessage());
    }

}
