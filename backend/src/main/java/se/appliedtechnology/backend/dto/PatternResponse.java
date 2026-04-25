package se.appliedtechnology.backend.dto;

import java.util.List;
import java.util.Map;

public record PatternResponse(String name, Map<String, Object> parameters, List<SectionDto> sections) {
}

