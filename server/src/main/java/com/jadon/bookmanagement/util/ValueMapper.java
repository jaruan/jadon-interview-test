package com.jadon.bookmanagement.util;

import com.jadon.bookmanagement.dto.BookRequestDTO;
import com.jadon.bookmanagement.entity.Book;

import java.time.LocalDate;

public class ValueMapper {
    public static Book convertToEntity(BookRequestDTO bookRequestDTO) {
        Book book = new Book();
        book.setTitle(bookRequestDTO.getTitle());
        book.setAuthor(bookRequestDTO.getAuthor());
        book.setIsbn(bookRequestDTO.getIsbn());
        book.setPublicationYear(bookRequestDTO.getPublicationYear());
        return book;
    }
}
