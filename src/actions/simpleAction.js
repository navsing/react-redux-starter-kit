export const onChangeTask = (index, taskObj) => {
    return {
        type: 'CHANGE_TASK',
        payload: {
            index: index,
            taskObj: taskObj
        }
    };
};

export const onDeleteTask = (taskObj) => {
    return {
        type: 'DELETE_TASK',
        payload: taskObj
    };
};

export const onAddTask = (taskObj) => {
    return {
        type: 'ADD_TASK',
        payload: taskObj
    };
};

export const changeTaskContent = (newVal) => {
    return {
        type: 'CHANGE_CONTENT',
        payload: newVal
    };
};