import { TaskPage } from "./pages/TaskPage";
import { LocalStorage } from "./pages/LocalStorage";
import WelcomePage from "./pages/WelcomePage";


export const routes = [
    {
        path: '/',
        element: <WelcomePage />
    }, 
    {
        path: '/localStorage',
        element: <LocalStorage />
    }, 

    {
        path: '/taskPage/*',
        element: <TaskPage />
    },
    

]