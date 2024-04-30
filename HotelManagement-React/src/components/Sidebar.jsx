export const Sidebar = () => {
  //Codigo memomentaneo
  const channels = [
    {id: '22', username: 'Bárcelo', isOnline: false},
    {id: '23', username: 'Biltmore Express', isOnline: true}
  ]
  //Codigo memomentaneo

  return (
    <div className="sidebar-container">
      <span className="sidebar-title">For you</span>
      <span className="sidebar-subtitle">Recommended hotels:</span>
      {
        channels.map((channel)=> {
          return (
            <div key={channel.id} className="sidebar-list-item">
              <span className="sidebar-list-username">{channel.username}</span>
              <button>
                Visualizar
              </button>
            </div>
          )
        })
      }
    </div>
  )
}
