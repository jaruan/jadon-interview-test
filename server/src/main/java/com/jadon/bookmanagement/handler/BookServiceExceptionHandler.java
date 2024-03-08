package com.jadon.bookmanagement.handler;

import com.jadon.bookmanagement.dto.APIResponse;
import com.jadon.bookmanagement.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class BookServiceExceptionHandler {

    private static final String ERROR_STATUS = "error";

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity <APIResponse<?>> handleNotFoundException(NotFoundException e) {

        return new ResponseEntity<>(APIResponse.builder()
                .status(ERROR_STATUS)
                .errorMessage(e.getMessage())
                .build(), HttpStatus.NOT_FOUND);
    }
}
