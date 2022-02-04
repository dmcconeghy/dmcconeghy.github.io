import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

function addTodo(todoList, text="test tests") {
    const textInput = todoList.getByLabelText("Todo item:");
    fireEvent.change(textInput, {target: { value: text}})
    const submitButton = todoList.getByText("Add it!")
    fireEvent.click(submitButton)
}

it("renders without crashing", function() {
    render(<TodoList />);
  });

it("matches snapshot", function() {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it("can add a todo", function() {
    const list = render(<TodoList />)
    addTodo(list)

    //cleared form, added todo
    expect(list.getByLabelText("Todo item:")).toHaveValue("");
    expect(list.getByText("Todo item:")).toBeInTheDocument()
    expect(list.getByText("Edit")).toBeInTheDocument()
    expect(list.getByText("X")).toBeInTheDocument()
})

it("can edit a todo", function() {
    const list = render(<TodoList />);
    addTodo(list);
  
    fireEvent.click(list.getByText("Edit"));
    const editInput = list.getByDisplayValue("test tests");
    fireEvent.change(editInput, { target: { value: "sleep" }});
    fireEvent.click(list.getByText("Update"));
  
    // expect only edited todo to appear
    expect(list.getByText("sleep")).toBeInTheDocument();
    expect(list.queryByText("test tests")).not.toBeInTheDocument();
  });

  it("can delete a todo", function() {
    const list = render(<TodoList />);
    addTodo(list);
  
    fireEvent.click(list.getByText("X"));
  
    // expect todo to be gone
    expect(list.queryByText("test tests")).not.toBeInTheDocument();
  });