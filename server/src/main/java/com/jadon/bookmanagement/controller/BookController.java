package com.jadon.bookmanagement.controller;

import com.jadon.bookmanagement.dto.APIResponse;
import com.jadon.bookmanagement.dto.BookRequestDTO;
import com.jadon.bookmanagement.entity.Book;
import com.jadon.bookmanagement.service.BookService;
import com.jadon.bookmanagement.util.ValueMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping(path = "api/v1/books")
@AllArgsConstructor
public class BookController {

    private static final String RESPONSE_STATUS = "success";

    @Autowired
    private final BookService bookService;
    @GetMapping
    public ResponseEntity<APIResponse<List<Book>>> getBooks() {
        List<Book> books =  this.bookService.getBooks();
        APIResponse<List<Book>> response = APIResponse.<List<Book>>builder().status(RESPONSE_STATUS).results(books).build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<APIResponse<Book>> getBook(@PathVariable("id") long id) {
        Book book = this.bookService.getBook(id);
        APIResponse<Book> response = APIResponse.<Book>builder().status(RESPONSE_STATUS).results(book).build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<APIResponse<Book>> createNewBook(@RequestBody @Valid BookRequestDTO bookRequestDTO) {
        Book book = ValueMapper.convertToEntity(bookRequestDTO);

        Book updatedBook = this.bookService.addBook(book);
        APIResponse<Book> response = APIResponse
                .<Book>builder()
                .status(RESPONSE_STATUS)
                .results(updatedBook)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping(path = "{id}")
    public ResponseEntity<APIResponse<Book>> updateBook(@PathVariable("id") long id, @RequestBody @Valid BookRequestDTO bookRequestDTO) {
        Book book = ValueMapper.convertToEntity(bookRequestDTO);
        book.setId(id);

        Book updatedBook = this.bookService.updateBook(book);
        APIResponse<Book> response = APIResponse
                .<Book>builder()
                .status(RESPONSE_STATUS)
                .results(updatedBook)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<?> deleteBook(@PathVariable("id") long id) {
        this.bookService.deleteBook(id);

        return new ResponseEntity<>(APIResponse.builder().status(RESPONSE_STATUS).build(), HttpStatus.OK);
    }
}
