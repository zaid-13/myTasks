import React, {useState} from 'react';
import './TaskList.css';

import Delete from '../../assets/icons/Delete';
import Edit from '../../assets/icons/Edit';

import modal from '../Modal/Modal';

function TaskList({task, setTask}) {

    const EditTaskModal = ({taskSelected}) => {

        const [editedValue, setEditedValue] = useState(task[taskSelected].taskName);

        const [validation, setValidation] = useState(true);

        const edit = (taskSelected) => {
            if (editedValue === "" || editedValue.trim() === "") {
                setValidation(false);
            } else {
                setValidation(true);
                const newArr = [...task];
                newArr[taskSelected].taskName = editedValue;
                setTask(newArr);
                localStorage.setItem("tasks", JSON.stringify(newArr));
                modal.close();
            }
        }

        const handleChange = (e) => {
            if (e.target.value === "" || e.target.value.trim() === "") {
                setValidation(false);
            } else {
                setValidation(true);
            }
            setEditedValue(e.target.value);
        }

        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                edit(taskSelected);
            }
        }

        return (
            <>
                <div className="modal-header">edit task</div>
                <div className="modal-body">
                    <input autoFocus value={editedValue} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} type="text" className="modal-input" />
                    {!validation && <div className="modal-validation">error: task cannot be empty!</div>}
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={() => edit(taskSelected)}>click here to save</button>
                </div>
            </>
        )
    }

    const checkTask = (e) => {
        const newArr = [...task];
        if (e.target.checked) {
            newArr[e.target.id].isComplete = true;
        } else {
            newArr[e.target.id].isComplete = false;
        }
        localStorage.setItem("tasks", JSON.stringify(newArr));
        setTask(newArr);
    }

    const editTask = (taskSelected) => {
        modal.open(<EditTaskModal taskSelected={taskSelected}  />);
    }

    const deleteTask = (e) => {
        const newTaskList = task.filter((item, index) => e.currentTarget.id != index);
        localStorage.setItem("tasks", JSON.stringify(newTaskList));
        setTask(newTaskList);
    }


    return(
        <section tasklist="true" className="tasklist">
            <ul>
                {
                    task.map((item, index) => {
                        return (
                            <li key={item.id}>
                                <input id={index} checked={item.isComplete} type="checkbox" onChange={(e) => checkTask(e)} />
                                <div className={`taskname ${task[index].isComplete && "completed"}`}>{item.taskName}</div>
                                <div id={index} className="edit-button" onClick={(e) => editTask(index)}><Edit /></div>
                                <div id={index} className="delete-button" onClick={(e) => deleteTask(e)}><Delete /></div>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default TaskList;