package se.appliedtechnology.backend.dto;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public record PatternResponse(UUID id,
                              String name,
                              Map<String, Object> parameters,
                              List<SectionDto> sections,
                              String notes) {
}

