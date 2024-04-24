package com.example.internshipHub.exception;

public class ServiceException extends RuntimeException {
    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }

    public ServiceException(String message) {
        super(message); // Call the superclass constructor with the message parameter
    }
}
