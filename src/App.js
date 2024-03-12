import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { v4 as uuid } from "uuid";

function App() {
  const [inputValue, setInputValue] = useState("");

  // todos
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!inputValue) return;
    setTodos((prev) => [
      ...prev,
      { id: uuid(), task: inputValue, completed: false, editMode: false },
    ]);
    setInputValue("");
  };

  const deleteTodo = (selectedId) => {
    setTodos((prev) => prev.filter((obj) => obj.id !== selectedId));
  };

  const editTodo = (selectedId) => {
    setTodos((prev) =>
      prev.map((obj) => {
        if (obj.id === selectedId) {
          return { ...obj, editMode: true };
        } else {
          return obj;
        }
      })
    );
  };

  const stopEditMode = (selectedId) => {
    setTodos((prev) =>
      prev.map((obj) => {
        if (obj.id === selectedId) {
          return { ...obj, editMode: false };
        } else {
          return obj;
        }
      })
    );
  };

  const handleCheckboxChange = (e, selectedId) => {
    setTodos((prev) =>
      prev.map((obj) => {
        if (obj.id === selectedId) {
          return { ...obj, completed: e.target.checked };
        } else {
          return obj;
        }
      })
    );
  };

  const handleTodoInputChange = (e, selectedId) => {
    setTodos((prev) =>
      prev.map((obj) => {
        if (obj.id === selectedId) {
          return { ...obj, task: e.target.value };
        } else {
          return obj;
        }
      })
    );
  };

  return (
    <div className="App">
      <header className="flex flex-col w-screen h-screen items-center bg-[#282c34]">
        <div className="flex flex-col">
          <h1 className="text-3xl mt-24 text-[#61dafb] font-bold">Todo App</h1>
          <div className="flex mt-24 gap-2">
            <input
              className="px-2 text-lg"
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}></input>
            <button
              disabled={!inputValue}
              onClick={addTodo}
              className="bg-[#61dafb] text-white px-4 py-2 rounded font-bold disabled:bg-gray-300">
              Add Todo
            </button>
          </div>
          <div className="flex flex-col mt-4 px-2">
            {todos.map((todo) => {
              return (
                <div
                  key={todo.id}
                  className="flex text-xl my-2 text-white gap-4 items-center">
                  <input
                    className="cursor-pointer w-[1rem] h-[1rem]"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => {
                      handleCheckboxChange(e, todo.id);
                    }}></input>
                  {todo.editMode ? (
                    <input
                      className=" text-white bg-transparent border border-white rounded focus:border-0 pl-2"
                      type="text"
                      value={todo.task}
                      onChange={(e) => {
                        handleTodoInputChange(e, todo.id);
                      }}></input>
                  ) : (
                    <div
                      className={`${
                        todo.completed && "line-through text-gray-500"
                      } mb-1`}>
                      {todo.task}
                    </div>
                  )}
                  {todo.editMode ? (
                    <div
                      className="ml-auto cursor-pointer"
                      onClick={() => {
                        stopEditMode(todo.id);
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 hover:text-green-500">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div
                      className="ml-auto cursor-pointer"
                      onClick={() => {
                        editTodo(todo.id);
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 hover:text-sky-500">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </div>
                  )}

                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 hover:text-red-500">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
