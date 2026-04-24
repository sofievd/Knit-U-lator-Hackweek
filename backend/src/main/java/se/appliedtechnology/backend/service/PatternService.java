package se.appliedtechnology.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import se.appliedtechnology.backend.dto.PatternResponse;
import se.appliedtechnology.backend.dto.SectionDto;
import se.appliedtechnology.backend.dto.SockPatternRequest;
import se.appliedtechnology.backend.dto.StepDto;

@Service
public class PatternService {

    public PatternResponse generatePattern(SockPatternRequest request) {
        long stitchCount = Math.round(request.footCircumference() * request.gauge());


        StepDto castOnStep = new StepDto(
            "cuff-1",
            "Cast on " + stitchCount + " stitches",
            "This determines the width of the sock cuff"
        );

        SectionDto cuffSection = new SectionDto("Cuff", List.of(castOnStep));
        return new PatternResponse(List.of(cuffSection));
    }
}

