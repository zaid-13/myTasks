import React, {useState, useEffect} from 'react';
import "./AddTask.css"

import modal from '../Modal/Modal';

function AddTask({task, setTask}) {

    const AddTaskModal = () => {

        const [taskName, setTaskName] = useState("");
        const [validation, setValidation] = useState(true);

        const add = () => {
            let newId;
            if (task.length >= 1) {
                newId = task[task.length - 1].id + 1;
            } else {
                newId = 1;
            }

            if (taskName === "" || taskName.trim() === "") {
                setValidation(false);
            } else {
                setValidation(true);
                const newArr = [...task];
                newArr.push({id: newId, taskName, isComplete: false});
                setTask(newArr);
                localStorage.setItem('tasks',JSON.stringify(newArr));
                modal.close();
            }
        }

        const handleChange = (e) => {
            setTaskName(e.target.value);
            if (e.target.value === "" || e.target.value.trim() === "") {
                setValidation(false);
            } else {
                setValidation(true);
            }
        }

        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                add();
            }
        }

        

        return <>
            <div className="modal-header">add task</div>
            <div className="modal-body">
                <input autoFocus type="text" value={taskName} onChange={(e) => handleChange(e)} onKeyDown={(e) => {handleKeyDown(e)}} className="modal-input" />
                {!validation && <div className="modal-validation">error: task cannot be empty!</div>}
            </div>
            <div className="modal-footer">
                <button className="modal-button" onClick={() => add()}>click here to add</button>
            </div>
        </>
    }
    
    const addTask = () => {
        modal.open(
            <AddTaskModal />
        )
    }

    return (
        <div addtask="true" className="addtask">
            <button onClick={addTask}>Add Task</button>
        </div>
    )
}

export default AddTask;