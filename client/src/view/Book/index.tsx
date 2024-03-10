import { useEffect, useState } from "react";
import { Space, Table, Button, Modal, Pagination, message } from "antd";
import styles from "./styles.module.scss";
import EditBookModal from "./components/EditBookModal";
import { createBook, deleteBook, getBooks, updateBook } from "../../api/book";
import { IBookDTO, IBookDTOWithPage } from "../../dto/book";

const { Column } = Table;

export default function Book() {
  const [messageApi, contextHolder] = message.useMessage();

  const [isOpenEditBookModal, setOpenEditBookModal] = useState(false);
  const [bookResponse, setBookResponse] = useState<IBookDTOWithPage>({
    results: [],
    totalPage: 0,
  });
  const [editableBook, setEditableBook] = useState<IBookDTO | null>();
  useState(false);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const fetchBooks = async (pageIndex: number) => {
    const response = await getBooks(pageIndex);
    setBookResponse({
      results: response.results,
      totalPage: response.totalPage,
    });
  };

  useEffect(() => {
    fetchBooks(currentPageIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitForm = async (bookRequestDTO: IBookDTO) => {
    if (bookRequestDTO.id) {
      await updateBook(bookRequestDTO.id, bookRequestDTO);
      messageApi.open({
        type: "success",
        content: "Book has been updated successfully!",
      });
    } else {
      await createBook(bookRequestDTO);
      messageApi.open({
        type: "success",
        content: "Book has been saved successfully!",
      });
    }
    setOpenEditBookModal(false);
    fetchBooks(currentPageIndex);
  };

  const handleEditBook = (book: IBookDTO | null) => {
    setEditableBook(book);
    setOpenEditBookModal(true);
  };

  const handleDeleteBook = (book: IBookDTO) => {
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
        messageApi.open({
          type: "success",
          content: "Book has been deleted successfully!",
        });
        fetchBooks(currentPageIndex);
      },
    });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPageIndex(pageNumber - 1);
    fetchBooks(pageNumber - 1);
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <Button type="primary" onClick={() => handleEditBook(null)}>
        Add Book
      </Button>
      <Table rowKey="id" dataSource={bookResponse.results} pagination={false}>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Author" dataIndex="author" key="author" />
        <Column
          title="Publication Year"
          dataIndex="publicationYear"
          key="publicationYear"
        />
        <Column title="ISBN" dataIndex="isbn" key="isbn" />

        <Column
          title="Action"
          key="action"
          render={(_: unknown, record: IBookDTO) => (
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
      <Pagination
        className={styles.pagination}
        defaultCurrent={1}
        total={bookResponse.totalPage * 10}
        onChange={(page) => handlePageChange(page)}
      />
      {isOpenEditBookModal && (
        <EditBookModal
          data={editableBook}
          header="Edit Book"
          onClose={() => setOpenEditBookModal(false)}
          onSubmitForm={(bookRequestDTO: IBookDTO) =>
            handleSubmitForm(bookRequestDTO)
          }
        />
      )}
    </div>
  );
}
