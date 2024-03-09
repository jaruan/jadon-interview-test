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
  vi.spyOn(api, "getBooks").mockResolvedValue({
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
});
