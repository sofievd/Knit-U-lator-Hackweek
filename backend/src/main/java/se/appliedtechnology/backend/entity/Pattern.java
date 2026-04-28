package se.appliedtechnology.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import se.appliedtechnology.backend.dto.SectionDto;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "patterns")
public class Pattern {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String patternType;

    @Column(nullable = false, updatable = false)
    private int patternVariantId;

    @Column(columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> parameters;

    @Column(nullable = false, columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<SectionDto> structure;

    @Column(columnDefinition = "text")
    private String notes;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    public Pattern() {
    }

    public Pattern(String name, String patternType, int patternVariantId, Map<String, Object> parameters, List<SectionDto> structure) {
        this.name = name;
        this.patternType = patternType;
        this.patternVariantId = patternVariantId;
        this.parameters = parameters;
        this.structure = structure;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPatternType() {
        return patternType;
    }

    public void setPatternType(String patternType) {
        this.patternType = patternType;
    }

    public int getPatternVariantId() {
        return patternVariantId;
    }

    public void setPatternVariantId(int patternVariant) {
        this.patternVariantId = patternVariant;
    }

    public Map<String, Object> getParameters() {
        return parameters;
    }

    public void setParameters(Map<String, Object> parameters) {
        this.parameters = parameters;
    }

    public List<SectionDto> getStructure() {
        return structure;
    }

    public void setStructure(List<SectionDto> structure) {
        this.structure = structure;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
