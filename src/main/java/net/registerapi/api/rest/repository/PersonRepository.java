package net.registerapi.api.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import net.registerapi.api.rest.model.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long>{
}
