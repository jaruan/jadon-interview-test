import { describe, it, expect, afterEach } from "vitest";
import { render } from "@testing-library/react";
import EditBookModal from "./EditBookModal";

describe("EditBookModal", () => {
  let currentRenderedComponent: { unmount: () => void };
  afterEach(() => {
    if (currentRenderedComponent) {
      currentRenderedComponent.unmount();
    }
  });

  it("should not fullfil the book info when data is null", () => {
    currentRenderedComponent = render(
      <EditBookModal
        header="Edit Book"
        data={null}
        onClose={() => {}}
        onSubmitForm={() => {}}
      />
    );

    expect(document.querySelector("input[id='basic_id']")).toBeNull();
  });

  it("should fullfil the book info when data is not null", () => {
    const mockData = {
      id: 1,
      title: "title",
    };

    currentRenderedComponent = render(
      <EditBookModal
        header="Edit Book"
        data={mockData}
        onClose={() => {}}
        onSubmitForm={() => {}}
      />
    );

    expect(
      document.querySelector("input[id='basic_id']")?.getAttribute("value")
    ).toBe("1");
    expect(
      document.querySelector("input[id='basic_title']")?.getAttribute("value")
    ).toBe("title");
    expect(
      document.querySelector("input[id='basic_author']")?.getAttribute("value")
    ).toBe("");
  });
});
