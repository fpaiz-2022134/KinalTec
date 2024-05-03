import { TaskPage } from "./pages/TaskPage";
import { LocalStorage } from "./pages/LocalStorage";


export const routes = [
    {
        path: '/localStorage',
        element: <LocalStorage />
    }, 

    {
        path: '/taskPage/*',
        element: <TaskPage />
    },
    

]