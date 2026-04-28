package se.appliedtechnology.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import se.appliedtechnology.backend.exception.CouldNotSavePatternException;
import se.appliedtechnology.backend.exception.NoPatternFoundexception;

@RestControllerAdvice
public class PatternExceptionHandler {

    @ExceptionHandler(NoPatternFoundexception.class)
    ResponseEntity<?> handleNoPatternFound(Exception e){
        String message = "No pattern found";
        return ResponseEntity.badRequest().body(message);
    }

    @ExceptionHandler(CouldNotSavePatternException.class)
    ResponseEntity<?> handleCouldNotSavePattern(Exception e){
        String message = "Could not save pattern";
        return ResponseEntity.badRequest().body(message);
    }
}
