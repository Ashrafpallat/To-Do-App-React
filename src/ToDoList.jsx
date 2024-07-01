import React, { useState, useEffect, useRef } from "react";
import { SketchPicker } from 'react-color';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#f9f9f9');

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, [tasks]);

    function addTask() {
        if (newTask.trim() !== '') {
            const lowercasedNewTask = newTask.toLowerCase();
            if (!tasks.includes(lowercasedNewTask)) {
                setTasks(t => [...t, lowercasedNewTask]);
                setNewTask('');
            } else {
                alert('Task already exists!');
            }
        }
    }

    function deleteTask(index) {
        const updatedTask = tasks.filter((_, i) => i !== index);
        setTasks(updatedTask);
    }

    function deleteAllTask() {
        setTasks([]);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index - 1]] = [updatedTask[index - 1], updatedTask[index]];
            setTasks(updatedTask);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index + 1]] = [updatedTask[index + 1], updatedTask[index]];
            setTasks(updatedTask);
        }
    }

    function handleChangeComplete(color) {
        setBackgroundColor(color.hex);
    }

    return (
        <div className="to-do-list" style={{ backgroundColor }}>
            <h1 className="heading">To-Do List</h1>
            <input
                type="text"
                placeholder="Enter a task..."
                value={newTask} ref={inputRef}
                onChange={handleInputChange} />
            <button className="add-button" title="add new task" onClick={addTask}>
                Add
            </button>
            <button className="move-button" onClick={deleteAllTask}>
                Remove all
            </button>
            <button className="move-button" onClick={() => setShowColorPicker(!showColorPicker)}>
                Change Theme 🎨
            </button>

            {showColorPicker && (
                <div style={{ position: 'absolute', zIndex: '2' }}>
                    <div style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }} onClick={() => setShowColorPicker(false)} />
                    <SketchPicker color={backgroundColor} onChangeComplete={handleChangeComplete} />
                </div>
            )}

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button className="delet-button" onClick={() => deleteTask(index)}> Delete </button>
                        <button className="move-button" onClick={() => moveTaskUp(index)}> ⬆️ </button>
                        <button className="move-button" onClick={() => moveTaskDown(index)}> ⬇️ </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
