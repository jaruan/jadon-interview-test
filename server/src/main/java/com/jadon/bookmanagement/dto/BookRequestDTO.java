package com.jadon.bookmanagement.dto;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookRequestDTO {

    @NotBlank(message = "Book title is required")
    private String title;

    private String author;

    @Length(min = 4, max = 4)
    private String publicationYear;

    @Length(min = 10, max = 13, message = "The length of ISBN should be more than 10 and less than 13")
    private String isbn;

}

