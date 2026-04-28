package se.appliedtechnology.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import se.appliedtechnology.backend.entity.Pattern;

import java.util.List;
import java.util.UUID;

@Repository
public interface PatternRepository extends JpaRepository<Pattern, UUID> {

    Pattern save(Pattern pattern);

    @Query("SELECT p FROM Pattern p WHERE p.userId = :userId")
    List<Pattern> findAllByUserId(@Param("userId") String userId);
}
