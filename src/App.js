import React, {useState} from 'react';
import './App.css';

import AddTask from './components/AddTask/AddTask';
import TaskList from './components/TaskList/TaskList';

function App() {
    const [task, setTask] = useState(JSON.parse(localStorage.getItem('tasks') || '[]'));

    const totalTasks = task.length;
    const completedTasks = task.filter(item => item.isComplete === true).length;

    return (
        <React.Fragment>
            <AddTask task={task} setTask={setTask} />
            {task.length !== 0 && <div className="info-text">you have completed {completedTasks} out of {totalTasks} tasks</div>}
            {task.length !== 0 && <TaskList task={task} setTask={setTask} />}
            {task.length === 0 && <div className="no-task-info-text">you currently have no tasks! click on add task button to get started</div>}
        </React.Fragment>
    )
}

export default App;