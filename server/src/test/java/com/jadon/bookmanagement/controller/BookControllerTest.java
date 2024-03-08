package com.jadon.bookmanagement.controller;

import com.jadon.bookmanagement.dto.APIResponse;
import com.jadon.bookmanagement.dto.BookRequestDTO;
import com.jadon.bookmanagement.entity.Book;
import com.jadon.bookmanagement.service.BookService;

import com.jadon.bookmanagement.util.ValueMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class BookControllerTest {

    @MockBean
    private BookService bookService;

    @Autowired
    private BookController bookController;

    @Test
    public void testGetBooks() {
        List<Book> mockBooks = new ArrayList<>();
        mockBooks.add(new Book(1L, "Book 1", "Author 1", "2024", "978-1-234567-89-0", LocalDate.parse("2024-01-01"), LocalDate.parse("2024-01-01")));
        mockBooks.add(new Book(1L, "Book 2", "Author 2", "2023", "888-1-234567-89-0", LocalDate.parse("2024-01-01"), LocalDate.parse("2024-01-01")));

        when(bookService.getBooks()).thenReturn(mockBooks);

        ResponseEntity<APIResponse<List<Book>>> response = bookController.getBooks();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, Objects.requireNonNull(response.getBody()).getResults().size());
        assertEquals("success", response.getBody().getStatus());
        verify(bookService, times(1)).getBooks();
    }

    @Test
    public void testGetBook() {
        Book mockBook = new Book(1L, "Book 1", "Author 1", "2024", "978-1-234567-89-0", LocalDate.parse("2024-01-01"), LocalDate.parse("2024-01-01"));

        when(bookService.getBook(1L)).thenReturn(mockBook);

        ResponseEntity<APIResponse<Book>> response = bookController.getBook(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("success", Objects.requireNonNull(response.getBody()).getStatus());
        assertEquals(mockBook, response.getBody().getResults());
        verify(bookService, times(1)).getBook(1L);
    }

    @Test
    public void testCreateNewBook() {
        BookRequestDTO mockRequestDTO = new BookRequestDTO("Book 1", "Author 1", "2024", "978-1-234567-89-0");
        Book toAddedBook = ValueMapper.convertToEntity(mockRequestDTO);
        Book mockBook = new Book(1L, "Book 1", "Author 1", "2024", "978-1-234567-89-0", LocalDate.parse("2024-01-01"), LocalDate.parse("2024-01-01"));

        when(bookService.addBook(toAddedBook)).thenReturn(mockBook);
        ResponseEntity<APIResponse<Book>> response = bookController.createNewBook(mockRequestDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("success", Objects.requireNonNull(response.getBody()).getStatus());
        assertEquals(mockBook, response.getBody().getResults());
        verify(bookService, times(1)).addBook(toAddedBook);
    }

    @Test
    public void testUpdateBook() {
        BookRequestDTO mockRequestDTO = new BookRequestDTO("Book 1", "Author 1", "2024", "978-1-234567-89-0");
        Book toUpdatedBook = ValueMapper.convertToEntity(mockRequestDTO);
        toUpdatedBook.setId(1L);

        Book mockBook = new Book(1L, "Book 1", "Author 1", "2024", "978-1-234567-89-0", LocalDate.parse("2024-01-01"), LocalDate.parse("2024-01-01"));

        when(bookService.updateBook(toUpdatedBook)).thenReturn(mockBook);
        BookRequestDTO bookRequestDTO = new BookRequestDTO("Book 1", "Author 1", "2024", "978-1-234567-89-0");
        ResponseEntity<APIResponse<Book>> response = bookController.updateBook(1L, bookRequestDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("success", Objects.requireNonNull(response.getBody()).getStatus());
        assertEquals(mockBook, response.getBody().getResults());
        verify(bookService, times(1)).updateBook(toUpdatedBook);
    }

    @Test
    public void testDeleteBook() {
        doNothing().when(bookService).deleteBook(1L);
        ResponseEntity<?> response = bookController.deleteBook(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(bookService, times(1)).deleteBook(1L);
    }
}
