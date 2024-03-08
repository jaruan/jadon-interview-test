package com.jadon.bookmanagement.controller;

import com.jadon.bookmanagement.dto.BookRequestDTO;
import com.jadon.bookmanagement.entity.Book;
import com.jadon.bookmanagement.service.BookService;
import com.jadon.bookmanagement.util.ValueMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping(path = "api/v1/books")
@AllArgsConstructor
public class BookController {

    @Autowired
    private final BookService bookService;
    @GetMapping
    public List<Book> getBooks() {
        return this.bookService.getBooks();
    }

    @GetMapping(path = "{id}")
    public Book getBook(@PathVariable("id") long id) {
        return this.bookService.getBook(id);
    }

    @PostMapping
    public Book createNewBook(@RequestBody @Valid BookRequestDTO bookRequestDTO) {
        Book book = ValueMapper.convertToEntity(bookRequestDTO);
        return this.bookService.addBook(book);
    }

    @PutMapping(path = "{id}")
    public Book updateBook(@PathVariable("id") long id, @RequestBody @Valid BookRequestDTO bookRequestDTO) throws Exception {
        Book book = ValueMapper.convertToEntity(bookRequestDTO);
        book.setId(id);
        return this.bookService.updateBook(book);
    }

    @DeleteMapping(path = "{id}")
    public void deleteBook(@PathVariable("id") long id) throws Exception {
        this.bookService.deleteBook(id);
    }
}
