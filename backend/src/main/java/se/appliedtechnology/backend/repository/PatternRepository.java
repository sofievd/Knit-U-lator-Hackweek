package se.appliedtechnology.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.appliedtechnology.backend.entity.Pattern;

import java.util.UUID;

@Repository
public interface PatternRepository extends JpaRepository<Pattern, UUID> {

    Pattern save(Pattern pattern);
}
