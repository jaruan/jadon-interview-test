import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditBookModal from "./EditBookModal";

describe("EditBookModal", () => {
  it("should not fullfil the book info when data is null", () => {
    render(
      <EditBookModal
        header="Edit Book"
        data={null}
        onClose={() => {}}
        onSubmitForm={() => {}}
      />
    );
    expect(screen.queryByTitle("Id")).toBeNull();
  });

  it("should fullfil the book info when data is not null", () => {
    const mockData = {
      id: 1,
      title: "title",
    };

    render(
      <EditBookModal
        header="Edit Book"
        data={mockData}
        onClose={() => {}}
        onSubmitForm={() => {}}
      />
    );
    expect(screen.getByLabelText("Id").getAttribute("value")).toBe("1");
    expect(screen.getByLabelText("Title").getAttribute("value")).toBe("title");
    expect(screen.getByLabelText("Author").getAttribute("value")).toBe("");
  });

  it("should call onSubmitForm when submit button is clicked", async () => {
    const mockOnSubmitFormFn = vi.fn();
    render(
      <EditBookModal
        header="Edit Book"
        data={null}
        onClose={() => {}}
        onSubmitForm={mockOnSubmitFormFn}
      />
    );
    const titleInput = screen.getByLabelText("Title");
    fireEvent.input(titleInput, { target: { value: "new title" } });
    const authorInput = screen.getByLabelText("Author");
    fireEvent.input(authorInput, { target: { value: "new author" } });
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockOnSubmitFormFn).toBeCalledWith({
        title: "new title",
        author: "new author",
      });
    });
  });

  it("should call onClose when cancel button is clicked", () => {
    const mockOnCloseFn = vi.fn();
    render(
      <EditBookModal
        header="Edit Book"
        data={null}
        onClose={mockOnCloseFn}
        onSubmitForm={() => {}}
      />
    );
    const cancelButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(cancelButton);
    expect(mockOnCloseFn).toBeCalled();
  });
});
