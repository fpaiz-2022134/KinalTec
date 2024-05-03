export const Task = ({tasks}) => {

    return (
      <div className="row g-0 justify-content-center mt-5">
        <div className="d-flex align-items-center justify-content-center">
          <h2 className="">My Tasks</h2>
        </div>
      {
        tasks.map((task)=> (
          <div key={task._id} className="card m-3 row g-0" style={{maxWidth: '18rem', maxHeight: '20rem'}}>
  
              <div className="card-body">
                <h5 className="card-title">{task.taskName}</h5>
                  <div className="card-body">
                    {task.taskDescription}
                  </div>
            </div>
          </div>
        ))
      }
      </div>
    )
  }

