import React, { useEffect, useState } from "react";
import { Space, Table, Button, Modal } from "antd";
import styles from "./styles.module.scss";
import EditBookModal from "./components/EditBookModal";
import { createBook, deleteBook, getBooks, updateBook } from "../../api/book";
import { IBookRequestDTO, IBookResponseDTO } from "../../dto/book";

const { Column } = Table;

export default function Book() {
  const [isOpenEditBookModal, setOpenEditBookModal] = useState(false);
  const [books, setBooks] = useState<IBookResponseDTO[]>([]);
  const [editableBook, setEditableBook] = useState<IBookResponseDTO | null>();
  useState(false);

  const fetchBooks = async () => {
    const books = await getBooks();
    setBooks(books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmitForm = async (bookRequestDTO: IBookRequestDTO) => {
    if (bookRequestDTO.id) {
      await updateBook(bookRequestDTO.id, bookRequestDTO);
    } else {
      await createBook(bookRequestDTO);
    }
    setOpenEditBookModal(false);
    fetchBooks();
  };

  const handleEditBook = (book: IBookResponseDTO | null) => {
    setEditableBook(book);
    setOpenEditBookModal(true);
  };

  const handleDeleteBook = (book: IBookResponseDTO) => {
    Modal.confirm({
      title: "Delete Book",
      content: `Are you sure you want to delete this book <${book.title}>?`,
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
      onOk: async () => {
        await deleteBook(book.id);
        fetchBooks();
      },
    });
  };

  return (
    <div className={styles.container}>
      <Button type="primary" onClick={() => handleEditBook(null)}>
        Add Book
      </Button>
      <Table dataSource={books}>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Author" dataIndex="author" key="author" />
        <Column
          title="Publication Year"
          dataIndex="publicationYear"
          key="publicationYear"
        />

        <Column
          title="Action"
          key="action"
          render={(_: any, record: IBookResponseDTO) => (
            <Space size="middle">
              <Button type="link" onClick={() => handleEditBook(record)}>
                Edit
              </Button>
              <Button type="link" onClick={() => handleDeleteBook(record)}>
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
      {isOpenEditBookModal && (
        <EditBookModal
          data={editableBook}
          header="Edit Book"
          onClose={() => setOpenEditBookModal(false)}
          onSubmitForm={(bookRequestDTO: IBookRequestDTO) =>
            handleSubmitForm(bookRequestDTO)
          }
        />
      )}
    </div>
  );
}
