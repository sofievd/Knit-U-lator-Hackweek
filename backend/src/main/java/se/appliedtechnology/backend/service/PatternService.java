package se.appliedtechnology.backend.service;

import org.springframework.stereotype.Service;
import se.appliedtechnology.backend.dto.PatternResponse;
import se.appliedtechnology.backend.dto.SectionDto;
import se.appliedtechnology.backend.dto.SockPatternRequest;
import se.appliedtechnology.backend.dto.StepDto;
import se.appliedtechnology.backend.entity.PatternTemplate;
import se.appliedtechnology.backend.repository.PatternTemplateRepository;

import java.util.List;

@Service
public class PatternService {

    private final PatternTemplateRepository repository;

    public PatternService(PatternTemplateRepository repository) {
        this.repository = repository;
    }


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

    public List<PatternTemplate> getTemplate() {
        List<PatternTemplate> templates = repository.findByPatternTypeAndPatternVariantId("sock", 1);
        for (PatternTemplate template : templates) {
            System.out.println(template);
        }
        return templates;
    }
}

