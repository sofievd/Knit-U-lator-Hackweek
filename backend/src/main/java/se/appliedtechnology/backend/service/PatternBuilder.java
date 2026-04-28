package se.appliedtechnology.backend.service;

import org.springframework.stereotype.Service;
import se.appliedtechnology.backend.dto.SectionDto;
import se.appliedtechnology.backend.dto.StepDto;
import se.appliedtechnology.backend.entity.PatternTemplate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class PatternBuilder {

    public List<SectionDto> build(List<PatternTemplate> templates,
                                  Map<String, Object> params,
                                  TemplateRenderer renderer) {

        Map<String, List<StepDto>> groupedSteps = new LinkedHashMap<>();

        for (PatternTemplate t : templates) {
            groupedSteps.putIfAbsent(t.getSectionName(), new ArrayList<>());

            StepDto step = new StepDto(
                    String.valueOf(t.getStepOrder()),
                    renderer.renderTemplate(t.getTemplateText(), params),
                    t.getExplanation(),
                    false
                    );

            groupedSteps.get(t.getSectionName()).add(step);

        }
        return groupedSteps.entrySet()
                .stream()
                .map((e -> new SectionDto((e.getKey()), e.getValue())))
                .toList();
    }

}
