package se.appliedtechnology.backend.exception;

public class CouldNotSavePatternException extends RuntimeException {

    public CouldNotSavePatternException(String message) {
        super(message);
    }

    public CouldNotSavePatternException(String message, Throwable cause) {
        super(message, cause);
    }

    public CouldNotSavePatternException(Throwable cause) {
        super(cause);
    }
}
