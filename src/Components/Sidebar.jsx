import { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import folder from '../assets/folder.svg'
import trash from '../assets/trash.svg'
import fav from '../assets/fav.svg'
import archive from '../assets/archive.svg'
import notes from '../assets/notes.svg'
import search from '../assets/search.svg'
import useRecentsData from '../hooks/useRecentsData'
import { useFolderData } from '../hooks/useFolderData'
import { Outlet, useNavigate, useParams } from 'react-router-dom'



const Sidebar = () => {
  const { notesId } = useParams()
  // console.log('side',notesId);
  
  const navigate = useNavigate()
  const [enableSearchBox, setEnableSearchBox] = useState(false)

  const { data,refetch } = useRecentsData(notesId);
  // console.log("notesdata",data);

  const { data: folderData } = useFolderData(notesId);
  // console.log("jks", folderData);
  // console.log(data,"fd");

  useEffect(()=>{
    refetch()
  },[notesId,data?.recentNotes?.preview])



  return (
    <>
      <div className="h-full w-full">
        <div className="h-15 flex justify-between items-center">
          <img src={logo} alt="value" />
          <img
            onClick={() => setEnableSearchBox(!enableSearchBox)}
            className="w-10 pr-2.5 cursor-pointer"
            src={search}
            alt="search"
          />
        </div>

        {enableSearchBox && (
          <div className="mt-4 px-2">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg p-2 w-full bg-amber-50 focus:outline-none"
            />
          </div>
        )}
        <div className="w-full ml-6 mt-4 hover:scale-105 ">
          <button className="w-4/5 bg-gray-700 text-white font-medium p-2 rounded-r shadow">
            + New Notes
          </button>
        </div>
        {/* Reacent Section  */}
        <div className="w-full mt-4">
          <span className="font-['Source_Sans_Pro'] text-amber-50 font-semibold text-sm">
            Recents
          </span>

          <div className="mt-2">
            {data && data.recentNotes && data.recentNotes.length > 0 ? (
              data.recentNotes.map((recent) => (
                <div
                  onClick={() => navigate(`notes/${recent.folder.id}`)}
                  key={recent.id}
                  className="flex items-center gap-2 m-1 hover:bg-gray-800 p-1 rounded cursor-pointer"
                >
                  <img src={folder} alt="folder" className="w-5 h-5" />
                  <span className="text-amber-50">{recent.title}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm mt-2">No recents found</p>
            )}
          </div>

        </div>


        {/* Folders Section */}
        <div className="w-full mt-4">
          <span className="font-['Source_Sans_Pro'] text-amber-50 font-semibold text-sm">
            Folders
          </span>

          <div
            className="mt-2 max-h-[300px] overflow-y-auto
      [&::-webkit-scrollbar]:w-1.5
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:bg-gray-600
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb:hover]:bg-gray-500
      scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
          >
            {folderData?.folders?.length > 0 ? (
              folderData.folders.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-2 m-1 hover:bg-gray-800 p-1 rounded cursor-pointer"
                >
                  <img src={notes} alt="folder" className="w-5 h-5" />
                  <span className="text-amber-50">{f.name}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm mt-2">No folders found</p>
            )}
          </div>
        </div>


        {/* more */}
        <div className="w-full m-2 mt-4 space-y-3">
          <div className="flex items-center gap-2 cursor-pointer hover:text-amber-300 transition">
            <img src={fav} alt="favorites" className="w-5 h-5" />
            <span className="text-amber-50">Favorites</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-amber-300 transition">
            <img src={trash} alt="trash" className="w-5 h-5" />
            <span className="text-amber-50">Trash</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-amber-300 transition">
            <img src={archive} alt="archived" className="w-5 h-5" />
            <span className="text-amber-50">Archived Notes</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
