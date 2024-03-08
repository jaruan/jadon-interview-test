package com.jadon.bookmanagement.dto;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookRequestDTO {

    @NotBlank(message = "Book title is required")
    private String title;

    private String author;

    @Length(min = 4, max = 4)
    private String publicationYear;

    @Length(min = 13, max = 17, message = "The length of ISBN should be more than 13 and less than 17")
    private String isbn;

}

