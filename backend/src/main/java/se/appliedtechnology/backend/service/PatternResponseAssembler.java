package se.appliedtechnology.backend.service;

import org.springframework.stereotype.Service;
import se.appliedtechnology.backend.dto.PatternResponse;
import se.appliedtechnology.backend.dto.SectionDto;
import se.appliedtechnology.backend.dto.StepDto;
import se.appliedtechnology.backend.entity.Pattern;
import se.appliedtechnology.backend.entity.PatternProgress;
import se.appliedtechnology.backend.repository.PatternProgressRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PatternResponseAssembler {
    private final PatternProgressRepository progressRepository;

    public PatternResponseAssembler(PatternProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    public PatternResponse toResponse(Pattern pattern) {

        List<PatternProgress> progressList =
                progressRepository.findByPatternId(pattern.getId());

        Map<String, Boolean> progressMap = new HashMap<>();

        for (PatternProgress p : progressList) {
            String key = p.getSectionIndex() + "-" + p.getStepIndex();
            progressMap.put(key, p.isCompleted());
        }

        List<SectionDto> sections = applyProgress(pattern.getStructure(), progressMap);

        return new PatternResponse(
                pattern.getId(),
                pattern.getName(),
                pattern.getParameters(),
                sections,
                pattern.getNotes()
        );
    }

    private List<SectionDto> applyProgress(
            List<SectionDto> rawSections,
            Map<String, Boolean> progressMap
    ) {

        List<SectionDto> sections = new ArrayList<>();

        for (int sIndex = 0; sIndex < rawSections.size(); sIndex++) {

            SectionDto rawSection = rawSections.get(sIndex);
            List<StepDto> steps = new ArrayList<>();

            for (int stepIndex = 0;
                 stepIndex < rawSection.steps().size();
                 stepIndex++) {

                StepDto rawStep = rawSection.steps().get(stepIndex);
                String key = sIndex + "-" + stepIndex;

                boolean completed = progressMap.getOrDefault(key, false);

                steps.add(new StepDto(
                        rawStep.id(),
                        rawStep.text(),
                        rawStep.explanation(),
                        completed
                ));
            }

            sections.add(new SectionDto(rawSection.name(), steps));
        }

        return sections;
    }
}

