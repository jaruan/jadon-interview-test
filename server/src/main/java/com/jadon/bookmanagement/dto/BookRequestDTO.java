package com.jadon.bookmanagement.dto;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Setter
@NoArgsConstructor
public class BookRequestDTO {

    @Getter
    @NotBlank(message = "Book title is required")
    private String title;

    @Getter
    private String author;

    @Getter
    @Length(min = 4, max = 4)
    private String publicationYear;

    @Getter
    @Length(min = 13, max = 17, message = "The length of ISBN should be more than 13 and less than 17")
    private String isbn;

}

