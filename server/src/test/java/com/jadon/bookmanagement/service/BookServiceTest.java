package com.jadon.bookmanagement.service;

import com.jadon.bookmanagement.entity.Book;
import com.jadon.bookmanagement.exception.NotFoundException;
import com.jadon.bookmanagement.repository.BookRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class BookServiceTest {

    @MockBean
    private BookRepository bookRepository;

    @Autowired
    private BookService bookService;

    @Test
    public void testGetBook() {
        Book book = new Book();
        book.setId(1L);
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));
        Book result = bookService.getBook(1L);

        assertEquals(book, result);
    }

    @Test
    public void testGetBooks() {
        Book book1 = new Book();
        Book book2 = new Book();
        when(bookRepository.findAll()).thenReturn(Arrays.asList(book1, book2));

        List<Book> result = bookService.getBooks();

        assertEquals(2, result.size());
    }

    @Test
    public void testAddBook() {
        Book book = new Book();
        when(bookRepository.save(book)).thenReturn(book);

        Book result = bookService.addBook(book);

        assertEquals(book, result);
    }

    @Test
    public void testUpdateBook() {
        Book book = new Book();
        book.setId(1L);
        when(bookRepository.existsById(1L)).thenReturn(true);
        when(bookRepository.save(book)).thenReturn(book);

        Book result = bookService.updateBook(book);

        assertEquals(book, result);
    }

    @Test
    public void testDeleteBook() {
        when(bookRepository.existsById(1L)).thenReturn(true);

        bookService.deleteBook(1L);

        verify(bookRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testCheckExisting() {
        when(bookRepository.existsById(1L)).thenReturn(false);

        assertThrows(NotFoundException.class, () -> bookService.checkExisting(1L));
    }
}