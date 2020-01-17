import React, { useState, useEffect } from "react";
import "./todo.css";

function Task({ task, index, completeTask, removeTask }) {
  return (
    <div
      className="task"
      style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
      {task.title}
      <button onClick={() => completeTask(index)}>Complete</button>
      <button style={{ background: "red" }} onClick={() => removeTask(index)}>
        X
      </button>
    </div>
  );
}

function Todo(params) {
  const [tasks, setTasks] = useState([
    {
      title: "Grab some Pizza",
      completed: true
    },
    {
      title: "Do your workout",
      completed: true
    },
    {
      title: "Hangout with friends",
      completed: false
    }
  ]);

  const [tasksRemaining, setTasksRemaining] = useState(0);

  useEffect(() => {
    setTasksRemaining(tasks.filter(item => !item.completed).length);
  });

  const addTask = title => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  const completeTask = index => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };
  const removeTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div className="todo-container">
      <div className="header">TODO - ITEMS</div>
      <div className="header">Pending tasks ({tasksRemaining})</div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            key={index}
            completeTask={completeTask}
            removeTask={removeTask}
          />
        ))}
      </div>
      <div className="create-task">
        <CreateTask addTask={addTask} />
      </div>
    </div>
  );
}

// create task
function CreateTask({ addTask }) {
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;

    addTask(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new task"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

export default Todo;
