import boardApp from '../../pages/board-app.vue'
import boardDetails from '../../pages/board-details.vue'
import taskDetails from '../../cmps/task-details.vue'
import dashboard from '../../pages/dashboard.vue'
import recorderPage from '../../pages/recorder-page.vue'

export default [
    {
        path: '/board',
        name: 'board-app',
        component: boardApp
    },
    {
        path: '/listening',
        name: 'recorder-page',
        component: recorderPage
    },
    {
        path: '/board/:boardId',
        name: 'board-details',
        component: boardDetails,
        children: [
            {
                path: 'task/:taskId',
                name: 'task-details',
                component: taskDetails
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                component: dashboard
            },
        ]
    }
]
