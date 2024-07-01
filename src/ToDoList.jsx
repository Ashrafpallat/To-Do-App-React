import React, { useState, useEffect, useRef } from "react"
function ToDoList() {

    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')

    function handleInputChange(event) {
        setNewTask(event.target.value)
    }

    const inputRef = useRef('null')
    useEffect(() => {
        inputRef.current.focus();

        return(()=>{
            console.log('cleanup code');
        })
    },[tasks])




    function addTask() {
        if (newTask.trim() !== '') {
            const lowercasedNewTask = newTask.toLowerCase();
            if (!tasks.includes(lowercasedNewTask)) {
                
                setTasks(t => [...t, lowercasedNewTask])
                 setNewTask('')
            }else{
                alert('Task already exists!')
            }

        }

    }

    function deleteTask(index) {
        const updatedTask = tasks.filter((_, i) =>
            i !== index)
        setTasks(updatedTask)
    }

    function deleteAllTask(){
        setTasks([])
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index - 1]] =
                [updatedTask[index - 1], updatedTask[index]]
            setTasks(updatedTask)
        }

    }
    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index + 1]] =
                [updatedTask[index + 1], updatedTask[index]]
            setTasks(updatedTask)
        }
    }

    return (
        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <input
                type="text"
                placeholder="Enter a task..."
                value={newTask} ref={inputRef}
                onChange={handleInputChange} />

            <button className="add-button" title="add new task"
                onClick={addTask}>
                Add
            </button>

            <button className="move-button" onClick={() => deleteAllTask()}> Remove all </button>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className="text">{task}</span>

                        <button className="delet-button" onClick={() => deleteTask(index)}> Delete </button>

                        <button className="move-button" onClick={() => moveTaskUp(index)}> ⬆️ </button>

                        <button className="move-button" onClick={() => moveTaskDown(index)}> ⬇️ </button>

                    </li>
                )}
            </ol>
        </div>
    )
}
export default ToDoList