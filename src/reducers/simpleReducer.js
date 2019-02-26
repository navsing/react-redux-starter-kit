import Immutable from "immutable";

let existingList = Immutable.fromJS([
    {
        task_id: 1,
        task_name: 'finish react tut'
    },
    {
        task_id: 2,
        task_name: 'clone it on git'
    },
    {
        task_id: 3,
        task_name: 'send it to @singer'
    }
]);

export default (state = existingList, action) => {
    switch (action.type) {
        case 'CHANGE_TASK':
            return state.setIn([action.payload.index, 'task_name'], action.payload.taskObj);
        case 'DELETE_TASK':
            return state.filter((item) => item.get('task_name') !== action.payload);
        case 'ADD_TASK':
            return state.push(action.payload);
        case 'CHANGE_CONTENT':
            return state.map ((item)=> {
                if(item.get('task_name') === action.payload) {
                    return item.set('task_name', 'yay');
                } else {
                    return item;
                }
            });
        default:
            return state
    }
}