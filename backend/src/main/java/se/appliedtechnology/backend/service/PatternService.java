package se.appliedtechnology.backend.service;

import org.springframework.stereotype.Service;
import se.appliedtechnology.backend.dto.PatternResponse;
import se.appliedtechnology.backend.dto.SectionDto;
import se.appliedtechnology.backend.dto.StepDto;
import se.appliedtechnology.backend.dto.UpdatePatternRequest;
import se.appliedtechnology.backend.entity.Pattern;
import se.appliedtechnology.backend.entity.PatternProgress;
import se.appliedtechnology.backend.exception.CouldNotSavePatternException;
import se.appliedtechnology.backend.exception.NoPatternFoundexception;
import se.appliedtechnology.backend.repository.PatternProgressRepository;
import se.appliedtechnology.backend.repository.PatternRepository;

import java.time.Instant;
import java.util.*;

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

    public Pattern savePattern(String type, int patternVariantId, Pattern response) {
        try {
            Pattern pattern = new Pattern();

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

    public PatternResponse getById(UUID id) {

        Pattern pattern = patternRepository
                .findById(id)
                .orElseThrow(() -> new NoPatternFoundexception("pattern not found"));

        List<PatternProgress> progressList = progressRepository.findByPatternId(id);

        Map<String, Boolean> progressMap = new HashMap<>();

        for (PatternProgress p : progressList) {
            String key = p.getSectionIndex() + "-" + p.getStepIndex();
            progressMap.put(key, p.isCompleted());
        }

        Map<String, Object> params = pattern.getParameters();
        List<SectionDto> rawSections = pattern.getStructure();
        List<SectionDto> sections = new ArrayList<>();

        for (int sIndex = 0; sIndex < rawSections.size(); sIndex++) {

            SectionDto rawSection = rawSections.get(sIndex);
            List<StepDto> steps = new ArrayList<>();

            for (int stepIndex = 0;
                 stepIndex < rawSection.steps().size();
                 stepIndex++) {

                StepDto rawStep = rawSection.steps().get(stepIndex);
                String key = sIndex + "-" + stepIndex;

                boolean completed =
                        progressMap.getOrDefault(key, false);

                steps.add(new StepDto(
                        rawStep.id(),
                        rawStep.text(),
                        rawStep.explanation(),
                        completed
                ));
            }

            sections.add(new SectionDto(
                    rawSection.name(),
                    steps
            ));
        }
        return new PatternResponse(
                pattern.getId(),
                pattern.getName(),
                params,
                sections,
                pattern.getNotes()
        );
    }

    public List<PatternResponse> getAll() {
        List<Pattern> patternList = patternRepository.findAll();
        // todo: check if the list is empty

        return patternList.stream().map((p) ->
                new PatternResponse(p.getId(), p.getName(), p.getParameters(), p.getStructure(), p.getNotes())
        ).toList();
    }

    public void deletePattern(UUID id) {
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
        if(request.notes() != null){
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

    public void toggle(UUID id, int sectionIndex, int stepIndex) {
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
    }


}
