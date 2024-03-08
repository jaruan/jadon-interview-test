package com.jadon.bookmanagement.service;

import com.jadon.bookmanagement.entity.Book;
import com.jadon.bookmanagement.repository.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BookService {

    @Autowired
    private final BookRepository bookRepository;

    public Book getBook(long id) {

        return this.bookRepository.findById(id).orElseThrow(() -> new IllegalStateException("Book with id " + id + " does not exist"));
    }

    public List<Book> getBooks() {
        return this.bookRepository.findAll();
    }

    public Book addBook(Book book) {
        return this.bookRepository.save(book);
    }

    public Book updateBook(Book book) throws Exception {
        this.checkExisting(book.getId());
        return this.bookRepository.save(book);
    }

    public void deleteBook(long id) throws Exception {
        this.checkExisting(id);
        this.bookRepository.deleteById(id);
    }

    public void checkExisting(long id) throws Exception{
        boolean isExisted = this.bookRepository.existsById(id);
        if (!isExisted) {
            // Todo: update the exception message
            throw new Exception("a");
        }
    }
}
