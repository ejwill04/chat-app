import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Login from "./login";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders the Chat App header", () => {
  act(() => {
    render(<Login />, container);
  });
  expect(container.getElementsByTagName('h2')[0].textContent).toBe('Chat App - Enter a Username');  
});