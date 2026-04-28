package se.appliedtechnology.backend.service;

import org.springframework.stereotype.Service;
import se.appliedtechnology.backend.dto.PatternResponse;
import se.appliedtechnology.backend.dto.SectionDto;
import se.appliedtechnology.backend.dto.SockPatternRequest;
import se.appliedtechnology.backend.entity.Pattern;
import se.appliedtechnology.backend.entity.PatternTemplate;
import se.appliedtechnology.backend.repository.PatternTemplateRepository;

import java.util.List;
import java.util.Map;

@Service
public class PatternGeneratorService {

    private final PatternTemplateRepository templateRepository;
    private final ParameterService parameterService;
    private final TemplateRenderer renderer;
    private final PatternBuilder builder;

    public PatternGeneratorService(PatternTemplateRepository repository, ParameterService parameterService, TemplateRenderer renderer, PatternBuilder builder) {
        this.templateRepository = repository;
        this.parameterService = parameterService;
        this.renderer = renderer;
        this.builder = builder;
    }

    public Pattern generateSockPattern(SockPatternRequest request) {
        List<PatternTemplate> templates = templateRepository.findByPatternTypeAndPatternVariantId("sock", 1);

        Map<String, Object> params = parameterService.generateSockParams(request);

        List<SectionDto> sections = builder.build(templates, params, renderer);

        Pattern pattern= new Pattern();
        pattern.setName(request.name());
        pattern.setParameters(params);
        pattern.setStructure(sections);
        pattern.setNotes("");
        return pattern;


    }

    public List<PatternTemplate> getTemplate() {
        List<PatternTemplate> templates = templateRepository.findByPatternTypeAndPatternVariantId("sock", 1);
        for (PatternTemplate template : templates) {
            System.out.println(template);
        }
        return templates;
    }
}

