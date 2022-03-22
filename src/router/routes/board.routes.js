import boardApp from '../../pages/board-app.vue'

export default [
    {
        path: '/board',
        name: 'board-app',
        component: boardApp
    },
    // {
    //     path: '/board/:boardId',
    //     name: 'board-details',
    //     component: boardDetails,
    //     children: [{
    //         path: '/task/:taskId',
    //         name: 'task-details',
    //         component: taskDetails
    //     }]
    // },
]
