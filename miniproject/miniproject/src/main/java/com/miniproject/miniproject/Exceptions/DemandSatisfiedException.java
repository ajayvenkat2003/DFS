package com.miniproject.miniproject.Exceptions;

public class DemandSatisfiedException extends  Exception{

    public DemandSatisfiedException() {
        super();
    }

    public DemandSatisfiedException(String message) {
        super(message);
    }

    public DemandSatisfiedException(String message, Throwable cause) {
        super(message, cause);
    }

    public DemandSatisfiedException(Throwable cause) {
        super(cause);
    }

    protected DemandSatisfiedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
