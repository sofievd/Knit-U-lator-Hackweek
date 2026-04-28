package se.appliedtechnology.backend.service;

import org.springframework.stereotype.Service;
import se.appliedtechnology.backend.dto.PatternResponse;
import se.appliedtechnology.backend.dto.SectionDto;
import se.appliedtechnology.backend.dto.UpdatePatternRequest;
import se.appliedtechnology.backend.entity.Pattern;
import se.appliedtechnology.backend.entity.PatternProgress;
import se.appliedtechnology.backend.exception.CouldNotSavePatternException;
import se.appliedtechnology.backend.exception.NoPatternFoundexception;
import se.appliedtechnology.backend.repository.PatternProgressRepository;
import se.appliedtechnology.backend.repository.PatternRepository;
import tools.jackson.databind.ObjectMapper;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

// saving and updating patterns
//TODO: rename patternService

@Service
public class PatternService {
    private final PatternRepository patternRepository;
    private final PatternProgressRepository progressRepository;


    public PatternService(PatternRepository patternRepository, PatternProgressRepository progressRepository) {
        this.patternRepository = patternRepository;
        this.progressRepository = progressRepository;
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

        } catch (Exception e) {
            throw new CouldNotSavePatternException("Could not save the pattern", e);
        }
    }

    public PatternResponse getById(UUID id) {
        Pattern pattern = patternRepository
                .findById(id)
                .orElseThrow(() -> new NoPatternFoundexception("pattern not found"));

        Map<String, Object> params = pattern.getParameters();
        List<SectionDto> sections = pattern.getStructure();

        return new PatternResponse(
                pattern.getName(),
                params,
                sections
        );
    }

    public List<PatternResponse> getAll(){
        List<Pattern> patternList = patternRepository.findAll();
        // todo: check if the list is empty

        return patternList.stream().map((p) ->
            new PatternResponse(p.getName(), p.getParameters(), p.getStructure())
        ).toList();
    }

    public void deletePattern(UUID id){
        if(!patternRepository.existsById(id)){
            throw new NoPatternFoundexception("pattern not found");
        }
        Pattern pattern = patternRepository
                .findById(id)
                .orElseThrow(() -> new NoPatternFoundexception("pattern not found"));

        patternRepository.delete(pattern);
    }

    public PatternResponse update(UUID id, UpdatePatternRequest request){
        Pattern pattern = patternRepository
                .findById(id)
                .orElseThrow(()->new NoPatternFoundexception("pattern not found"));

        if(request.name() != null){
            pattern.setName(request.name());
        }
//        if(request.notes() != null){
//            pattern.setNotes(request.notes());
//        }
        Pattern saved = patternRepository.save(pattern);

        Map<String, Object> params = pattern.getParameters();
        List<SectionDto> sections = pattern.getStructure();

        return new PatternResponse(
                pattern.getName(),
                params,
                sections
        );
    }


}
