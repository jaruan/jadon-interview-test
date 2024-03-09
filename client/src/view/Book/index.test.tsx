import { describe, it, expect, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import Book from ".";
import * as api from "../../api/book";

describe("Book Page", () => {
  const mockBookResults = [
    { id: 1, title: "book title", author: "book author" },
  ];

  const createBookFn = vi.spyOn(api, "createBook");
  const updateBookFn = vi.spyOn(api, "updateBook");
  const deleteBookFn = vi.spyOn(api, "deleteBook");
  const getBooksFn = vi.spyOn(api, "getBooks").mockResolvedValue({
    results: mockBookResults,
    totalPage: 1,
  });

  it("should render table when finishing getting data", async () => {
    render(<Book />);
    const tableRows = screen.getAllByRole("row");
    await waitFor(() => {
      expect(tableRows.length).toBe(mockBookResults.length + 1);
    });
  });

  it("should open modal when clicking the add book button", async () => {
    render(<Book />);
    const addBookButton = screen.getByRole("button", { name: "Add Book" });
    fireEvent.click(addBookButton);
    await waitFor(() => {
      const editableModal = screen.getByRole("dialog");
      expect(editableModal).exist;
    });
  });

  it("should invoke createBook function when finishing fill in new book info", async () => {
    createBookFn.mockResolvedValue({ id: 1, title: "book title" });

    render(<Book />);
    const addBookButton = screen.getByRole("button", { name: "Add Book" });
    fireEvent.click(addBookButton);
    act(() => {
      const titleInput = screen.getByLabelText("Title");
      fireEvent.input(titleInput, { target: { value: "new title" } });
      const submitButton = screen.getByText("Submit");
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(createBookFn).toBeCalledWith({ title: "new title" });
    });
  });

  it("should invoke updateBook function when finishing updating the book info", async () => {
    updateBookFn.mockResolvedValue({ id: 1, title: "book title" });
    render(<Book />);
    await waitFor(() => {
      const editBookLink = screen.getByRole("button", { name: "Edit" });
      fireEvent.click(editBookLink);
    });

    act(() => {
      const titleInput = screen.getByLabelText("Title");
      fireEvent.input(titleInput, { target: { value: "updated title" } });
      const submitButton = screen.getByText("Submit");
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(updateBookFn).toBeCalledWith(1, {
        id: 1,
        title: "updated title",
        author: "book author",
      });
    });
  });

  it("should invoke deleteBook function when confirming deleting a book", async () => {
    deleteBookFn.mockResolvedValue();

    render(<Book />);
    await waitFor(() => {
      const editBookLink = screen.getByRole("button", { name: "Delete" });
      fireEvent.click(editBookLink);
    });

    act(() => {
      const confirmDeleteButton = screen.getByRole("button", { name: "OK" });
      fireEvent.click(confirmDeleteButton);
    });

    await waitFor(() => {
      expect(deleteBookFn).toBeCalledWith(1);
    });
  });

  it("should invoke getBooks function when changing the page", async () => {
    const mockBooks = [];
    for (let i = 0; i < 20; i++) {
      mockBooks.push({ id: i + 1, title: `title ${i}` });
    }
    getBooksFn.mockResolvedValue({ results: mockBooks, totalPage: 2 });

    render(<Book />);
    await waitFor(() => {
      const li = screen.getByTitle("2");
      fireEvent.click(li.children[0]);
    });
    await waitFor(() => {
      expect(getBooksFn).toHaveBeenLastCalledWith(1);
    });
  });
});
