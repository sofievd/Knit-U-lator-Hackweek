package se.appliedtechnology.backend.service;

import org.springframework.stereotype.Service;
import se.appliedtechnology.backend.dto.SockPatternRequest;

@Service
public class PatternService {

    public String generatePattern(SockPatternRequest request) {
        long stitchCount = Math.round(request.footCircumference() * request.gauge());

        return "number of stitches: " + stitchCount;
    }
}

