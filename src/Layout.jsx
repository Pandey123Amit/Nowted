import Middlebar from "./Components/Middlebar"
import Sidebar from "./Components/Sidebar"

// Layout
const Layout = () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="bg-black w-1/6"><Sidebar /></div>
      <div className="bg-black flex-1"><Middlebar /></div>
    </div>
  )
}


export default Layout
//