package se.appliedtechnology.backend.service;

import org.springframework.stereotype.Service;
import se.appliedtechnology.backend.dto.PatternResponse;
import se.appliedtechnology.backend.entity.Pattern;
import se.appliedtechnology.backend.exception.CouldNotSavePatternException;
import se.appliedtechnology.backend.repository.PatternRepository;
import tools.jackson.databind.ObjectMapper;

import java.time.Instant;

// saving and updating patterns
//TODO: rename patternService

@Service
public class PatternSaveService {
    private final PatternRepository patternRepository;
//    private final ObjectMapper objectMapper = new ObjectMapper();


    public PatternSaveService(PatternRepository patternRepository) {
        this.patternRepository = patternRepository;
    }

    public Pattern savePattern(String type, int patternVariantId, PatternResponse response) {
        try {
            Pattern pattern = new Pattern();

            pattern.setName(response.name());
            pattern.setPatternType(type);
            pattern.setPatternVariantId(patternVariantId);

            pattern.setParameters(response.parameters());
            pattern.setStructure(response.sections());

            pattern.setCreatedAt(Instant.now());

            return patternRepository.save(pattern);

        }catch (Exception e){
            throw new CouldNotSavePatternException("Could not save the pattern", e);
        }
    }

}
