import { useEffect, useState } from "react";
import "./draganddrop.css";

function DragAndDropFeature() {
  const [loading, setLoading] = useState(false);
  const [toDos, setToDos] = useState([]);
  const baseURL = "https://dummyjson.com/todos?limit=5&skip=0";

  async function fetchListOfToDos() {
    try {
      setLoading(true);
      const res = await fetch(baseURL, { method: "GET" });
      const result = await res.json();
      if (result && result.todos && result.todos.length > 0) {
        const updatedToDos = result.todos.map((toDoItem) => ({
          ...toDoItem,
          status: "wip",
        }));
        setToDos(updatedToDos);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListOfToDos();
  }, []);

  function onDragStart(event, id) {
    event.dataTransfer.setData("id", id);
  }

  function onDrop(event, status) {
    const id = event.dataTransfer.getData("id");
    const updatedToDos = toDos.map((toDoItem) => {
      if (toDoItem.id.toString() === id) {
        return { ...toDoItem, status };
      }
      return toDoItem;
    });
    setToDos(updatedToDos);
  }

  function renderToDos() {
    const toDoListToRender = {
      wip: [],
      completed: [],
    };
    toDos.forEach((toDoItem) => {
      toDoListToRender[toDoItem.status].push(
        <div
          onDragStart={(e) => onDragStart(e, toDoItem.id)}
          draggable
          key={toDoItem.id}
          className="todo-card"
        >
          {toDoItem.todo}
        </div>
      );
    });
    return toDoListToRender;
  }

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="drag-and-drop-container">
      <h1>Drag and Drop</h1>
      <div className="drag-and-drop-board">
        <div
          onDrop={(e) => onDrop(e, "wip")}
          onDragOver={(e) => e.preventDefault()}
          className="work-in-progress"
        >
          <h3>In Progress</h3>
          <div className="todo-list-wrapper">{renderToDos().wip}</div>
        </div>
        <div
          onDrop={(e) => onDrop(e, "completed")}
          onDragOver={(e) => e.preventDefault()}
          className="completed"
        >
          <h3>Completed</h3>
          {renderToDos().completed}
        </div>
      </div>
    </div>
  );
}

export default DragAndDropFeature;
