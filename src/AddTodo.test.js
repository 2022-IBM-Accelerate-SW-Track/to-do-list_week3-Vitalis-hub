import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  //dupicate task
  const inputTask2 = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate2 = screen.getByPlaceholderText("mm/dd/yyyy");
  const element2 = screen.getByRole('button', {name: /Add/i});
  const dueDate2 = "05/30/2023";
  fireEvent.change(inputTask2, { target: { value: "History Test"}});
  fireEvent.change(inputDate2, { target: { value: dueDate2}});
  fireEvent.click(element2);
  const check = screen.getAllByText(/History Test/i);
  expect(check).toHaveLength(1);

 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2022";
  //fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const check = screen.queryByText(/History Test1/i);
  const checkDate = screen.queryByText(new RegExp(dueDate, "i"));
  expect(check).not.toBeInTheDocument();
  expect(checkDate).not.toBeInTheDocument();

 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2022";
  fireEvent.change(inputTask, { target: { value: "History Test2"}});
  fireEvent.change(inputDate);
  fireEvent.click(element);

  const check = screen.queryByText(/History Test2/i);
  const checkDate = screen.queryByText(new RegExp(dueDate, "i"));
  expect(check).not.toBeInTheDocument();
  expect(checkDate).not.toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "06/30/2022";
  fireEvent.change(inputTask, { target: { value: "History Test3"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  //const checkbox = screen.getByTestId(/History Test3/i).checkbox;
  const checkbox = screen.getByRole('checkbox');
  const check = screen.getByText(/History Test3/i);
  const checkDate = screen.getByText(new RegExp(new Date(dueDate).toLocaleDateString(), "i")); 
  
  //const checkbox = historyCheck.getByTestId(/History Test3/i);
  fireEvent.click(checkbox)
  expect(check).not.toBeInTheDocument();
  expect(checkDate).not.toBeInTheDocument();

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "01/30/2022";
  fireEvent.change(inputTask, { target: { value: "History Test4"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const historyCheck = screen.getByTestId(/History Test4/i);
  expect(historyCheck).toHaveStyle('background-color:  #FF0000')
 });
