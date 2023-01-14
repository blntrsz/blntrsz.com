import { useRef } from "react";
import { useOutsideClick } from "../use-outside-click.hook";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

const INSIDE_COMPONENT = "insideComponent";
const OUTSIDE_COMPONENT = "outsideComponent";

const Component = ({ callback }: { callback: Function }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick([ref], callback);

  return (
    <>
      <div data-testid={OUTSIDE_COMPONENT}>{OUTSIDE_COMPONENT}</div>
      <div ref={ref} data-testid={INSIDE_COMPONENT}>
        {INSIDE_COMPONENT}
      </div>
    </>
  );
};

describe("useOutsideClick", () => {
  it("should fire the callback on mousedown outside of the component", () => {
    const callback = jest.fn();
    render(<Component callback={callback} />);

    fireEvent.mouseDown(screen.getByTestId(OUTSIDE_COMPONENT));

    expect(callback).toBeCalled();
  });

  it("should not fire the callback on mousedown inside of the component", () => {
    const callback = jest.fn();
    render(<Component callback={callback} />);

    fireEvent.mouseDown(screen.getByTestId(INSIDE_COMPONENT));

    expect(callback).not.toBeCalled();
  });
});
