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

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class PatternService {
    private final PatternRepository patternRepository;
    private final PatternProgressRepository progressRepository;
    private final PatternResponseAssembler assembler;


    public PatternService(PatternRepository patternRepository, PatternProgressRepository progressRepository, PatternResponseAssembler assembler) {
        this.patternRepository = patternRepository;
        this.progressRepository = progressRepository;
        this.assembler = assembler;
    }

    public Pattern savePattern(String type, int patternVariantId, Pattern response) {
        try {
            Pattern pattern = new Pattern();
            pattern.setUserId(response.getUserId());
            pattern.setName(response.getName());
            pattern.setPatternType(type);
            pattern.setPatternVariantId(patternVariantId);

            pattern.setParameters(response.getParameters());
            pattern.setStructure(response.getStructure());

            pattern.setCreatedAt(Instant.now());

            return patternRepository.save(pattern);

        } catch (Exception e) {
            throw new CouldNotSavePatternException("Could not save the pattern", e);
        }
    }

    public PatternResponse getByIdAndUserID(UUID id) {

        Pattern pattern = patternRepository
                .findById(id)
                .orElseThrow(() -> new NoPatternFoundexception("pattern not found"));

        return assembler.toResponse(pattern);
    }

    public List<PatternResponse> getAllFromUser(String userId) {
        List<Pattern> patternList = patternRepository.findAllByUserId(userId);
        if (patternList == null) {
            throw new NoPatternFoundexception("patterns not found");
        }

        return patternList.stream().map(assembler::toResponse).toList();
    }

    public void deletePatternFromUser(UUID id) {
        if (!patternRepository.existsById(id)) {
            throw new NoPatternFoundexception("pattern not found");
        }
        Pattern pattern = patternRepository
                .findById(id)
                .orElseThrow(() -> new NoPatternFoundexception("pattern not found"));

        patternRepository.delete(pattern);
    }

    public PatternResponse update(UUID id, UpdatePatternRequest request) {
        Pattern pattern = patternRepository
                .findById(id)
                .orElseThrow(() -> new NoPatternFoundexception("pattern not found"));

        if (request.name() != null) {
            pattern.setName(request.name());
        }
        if (request.notes() != null) {
            pattern.setNotes(request.notes());
        }
        Pattern saved = patternRepository.save(pattern);

        Map<String, Object> params = saved.getParameters();
        List<SectionDto> sections = saved.getStructure();

        return new PatternResponse(
                saved.getId(),
                saved.getName(),
                params,
                sections,
                saved.getNotes()

        );
    }

    public PatternResponse toggle(UUID id, int sectionIndex, int stepIndex) {
        PatternProgress progress = progressRepository.findByPatternIdAndSectionIndexAndStepIndex(id, sectionIndex, stepIndex)
                .orElseGet(() -> {
                    PatternProgress p = new PatternProgress();
                    p.setPatternId(id);
                    p.setSectionIndex(sectionIndex);
                    p.setStepIndex(stepIndex);
                    return p;
                });

        progress.setCompleted(!progress.isCompleted());
        progressRepository.save(progress);
        return getByIdAndUserID(id);
    }


}
