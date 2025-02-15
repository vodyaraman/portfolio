import ReduxProvider from "./redux-provider/ReduxProvider.tsx"
import TaskThree from "./Task3.tsx"

const TaskThreeAnswer = () => {
    return (
        <ReduxProvider>
            <TaskThree sliceId={101}/>
        </ReduxProvider>
    )
}

export default TaskThreeAnswer