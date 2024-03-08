package com.jadon.bookmanagement.repository;

import com.jadon.bookmanagement.entity.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Long> {
}
