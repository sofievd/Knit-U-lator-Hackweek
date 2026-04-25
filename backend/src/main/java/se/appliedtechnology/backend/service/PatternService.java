package se.appliedtechnology.backend.service;

import org.springframework.stereotype.Service;
import se.appliedtechnology.backend.dto.PatternResponse;
import se.appliedtechnology.backend.dto.SectionDto;
import se.appliedtechnology.backend.dto.SockPatternRequest;
import se.appliedtechnology.backend.entity.PatternTemplate;
import se.appliedtechnology.backend.repository.PatternTemplateRepository;

import java.util.List;
import java.util.Map;

@Service
public class PatternService {

    private final PatternTemplateRepository templateRepository;
    private final ParameterService parameterService;
    private final TemplateRenderer renderer;
    private final PatternBuilder builder;

    public PatternService(PatternTemplateRepository repository, ParameterService parameterService, TemplateRenderer renderer, PatternBuilder builder) {
        this.templateRepository = repository;
        this.parameterService = parameterService;
        this.renderer = renderer;
        this.builder = builder;
    }

    public PatternResponse generateSockPattern(SockPatternRequest request) {
        List<PatternTemplate> templates = templateRepository.findByPatternTypeAndPatternVariantId("sock", 1);

        Map<String, Object> params = parameterService.generateSock(request);

        List<SectionDto> sections = builder.build(templates, params, renderer);

        return new PatternResponse("Basic sock", params, sections);


    }


    public List<PatternTemplate> getTemplate() {
        List<PatternTemplate> templates = templateRepository.findByPatternTypeAndPatternVariantId("sock", 1);
        for (PatternTemplate template : templates) {
            System.out.println(template);
        }
        return templates;
    }
}

