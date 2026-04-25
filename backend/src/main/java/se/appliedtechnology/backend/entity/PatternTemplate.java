package se.appliedtechnology.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "pattern_templates")
public class PatternTemplate {
    @Id
    private UUID id;

    private String patternType;
    private int patternVariantId;

    private String sectionName;
    private int sectionOrder;
    private int stepOrder;

    @Column(columnDefinition = "text")
    private String templateText;

    @Column(columnDefinition = "text")
    private String explanation;

    public PatternTemplate() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public void setPatternVariantId(int patternVariantId) {
        this.patternVariantId = patternVariantId;
    }

    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public int getSectionOrder() {
        return sectionOrder;
    }

    public void setSectionOrder(int sectionOrder) {
        this.sectionOrder = sectionOrder;
    }

    public int getStepOrder() {
        return stepOrder;
    }

    public void setStepOrder(int stepOrder) {
        this.stepOrder = stepOrder;
    }

    public String getTemplateText() {
        return templateText;
    }

    public void setTemplateText(String templateText) {
        this.templateText = templateText;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public PatternTemplate(UUID id, String patternType, int patternVariantId, String sectionName, int sectionOrder, int stepOrder, String templateText, String explanation) {
        this.id = id;
        this.patternType = patternType;
        this.patternVariantId = patternVariantId;
        this.sectionName = sectionName;
        this.sectionOrder = sectionOrder;
        this.stepOrder = stepOrder;
        this.templateText = templateText;
        this.explanation = explanation;
    }

    @Override
    public String toString() {
        return "PatternTemplate{" +
                "id=" + id +
                ", patternType='" + patternType + '\'' +
                ", patternVariantId=" + patternVariantId +
                ", sectionName='" + sectionName + '\'' +
                ", sectionOrder=" + sectionOrder +
                ", stepOrder=" + stepOrder +
                ", templateText='" + templateText + '\'' +
                ", explanation='" + explanation + '\'' +
                '}';
    }
}
