package com.jadon.bookmanagement.service;

import com.jadon.bookmanagement.entity.Book;
import com.jadon.bookmanagement.exception.NotFoundException;
import com.jadon.bookmanagement.repository.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BookService {

    @Autowired
    private final BookRepository bookRepository;

    public Book getBook(long id) {

        return bookRepository.findById(id).orElseThrow(() -> new NotFoundException("Book with id " + id + " does not exist"));
    }

    public Page<Book> getBooks(int skip, int limit) {
        PageRequest pageRequest = PageRequest.of(skip, limit);
        return bookRepository.findAll(pageRequest);
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public Book updateBook(Book book) {
        checkExisting(book.getId());
        return bookRepository.save(book);
    }

    public void deleteBook(long id) {
        checkExisting(id);
        bookRepository.deleteById(id);
    }

    public void checkExisting(long id) {
        boolean isExisted = bookRepository.existsById(id);
        if (!isExisted) {
            throw new NotFoundException("Book with id " + id + " does not exist");
        }
    }
}
