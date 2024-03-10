package com.jadon.bookmanagement.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;

@ApiModel(value = "Book", description = "Book entity")
@Entity
@Table(name = "book")
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Book {

    @ApiModelProperty(value = "Book id", example = "1")
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ApiModelProperty(value = "Book title", example = "The Alchemist")
    @Column(name="title", nullable = false, columnDefinition = "VARCHAR(255)")
    private String title;

    @ApiModelProperty(value = "Book author", example = "Paulo Coelho")
    @Column(name = "author", columnDefinition = "VARCHAR(255)")
    private String author;

    @ApiModelProperty(value = "Book publication year", example = "1988")
    @Column(name = "publication_year", columnDefinition = "VARCHAR(4)")
    private String publicationYear;

    @ApiModelProperty(value = "Book ISBN", example = "9-780-061122415")
    @Column(name = "isbn", columnDefinition = "VARCHAR(13)")
    private String isbn;

    @Column(name = "created_at", updatable = false, nullable = false)
    @CreationTimestamp
    private LocalDate createdAt;


    @Column(name = "updated_at", nullable = false)
    @UpdateTimestamp
    private LocalDate updatedAt;

}
