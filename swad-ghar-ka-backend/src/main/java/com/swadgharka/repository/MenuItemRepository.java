package com.swadgharka.repository;

import com.swadgharka.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    List<MenuItem> findByAvailableTrue();

    List<MenuItem> findByCategoryIgnoreCase(String category);

    List<MenuItem> findByCategoryIgnoreCaseAndAvailableTrue(String category);

    List<MenuItem> findByVeg(boolean isVeg);
}