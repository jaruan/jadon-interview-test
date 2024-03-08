package com.jadon.bookmanagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "book")
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Book {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="title", nullable = false, columnDefinition = "VARCHAR(255)")
    private String title;

    @Column(name = "author", columnDefinition = "VARCHAR(255)")
    private String author;

    @Column(name = "publication_year", columnDefinition = "VARCHAR(4)")
    private String publicationYear;

    @Column(name = "isbn", columnDefinition = "VARCHAR(17)")
    private String isbn;

    @Column(name = "created_at", updatable = false, nullable = false)
    @CreationTimestamp
    private LocalDate createdAt;


    @Column(name = "updated_at", nullable = false)
    @UpdateTimestamp
    private LocalDate updatedAt;

}
