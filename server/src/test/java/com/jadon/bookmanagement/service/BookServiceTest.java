package com.jadon.bookmanagement.service;

import com.jadon.bookmanagement.entity.Book;
import com.jadon.bookmanagement.exception.NotFoundException;
import com.jadon.bookmanagement.repository.BookRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

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
        int skip = 0;
        int limit = 10;
        Page mockPage = mock(Page.class);
        when(bookRepository.findAll(PageRequest.of(skip, limit))).thenReturn(mockPage);

        Page<Book> result = bookService.getBooks(skip, limit);
        assertEquals(mockPage, result);
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