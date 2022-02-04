import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

function addTestBox(boxList, height = "100", width = "100", color = "red"){
    //Grab the inputs from their labels
    const fakeBgColor = boxList.getByLabelText("Background Color:")
    const fakeWidth = boxList.getByLabelText("Width:")
    const fakeHeight = boxList.getByLabelText("Height:")
    
    //fake the variable assignments
    fireEvent.change(fakeBgColor, { target: {value: color}})
    fireEvent.change(fakeWidth, { target: {value: width}})
    fireEvent.change(fakeHeight, { target: {value: height}})

    // Grab the button
    const button = boxList.getByText("Submit!")

    //Click the button
    fireEvent.click(button)
}

it("renders without crashing", function(){
    render(<BoxList />)
})

it("matches snapshot", function() {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
  });

it("can make a box", function(){
    const boxList = render(<BoxList />)

    //Starts empty
    expect(boxList.queryByText("Remove me!")).not.toBeInTheDocument()

    //Add our test box
    addTestBox(boxList)

    // expect a box to be created
    const removeButton = boxList.getByText("Remove me!")
    expect(removeButton).toBeInTheDocument()
    expect(removeButton.previousSibling).toHaveStyle(`
        background-color: red;
        width: 100px;
        height: 100px;
    `)
    
    expect(boxList.getAllByDisplayValue("")).toHaveLength(3)
    });
 
it("Removes boxes", function(){
    const boxList = render(<BoxList />)
    addTestBox(boxList)

    const removeButton = boxList.getByText("Remove me!")

    fireEvent.click(removeButton)
    expect(removeButton).not.toBeInTheDocument()
})