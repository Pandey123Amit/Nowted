import React, { useState } from 'react'
import trash from '../assets/trash.svg'
import fav from '../assets/fav.svg'
import archive from '../assets/archive.svg'
import { TiStar } from "react-icons/ti";
import { FaArchive } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";





function SidePopUp({ favorites, setFavorites, archived,
  setArchived,
  remove,
  setRemove }) {
  console.log(favorites);

  return (
    <div className='bg-gray-600 w-50 py-2 rounded-2xl' >
      <div className="w-full m-2 mt-4 space-y-3">
        <div onClick={() => setFavorites(!favorites)} className="flex items-center gap-3 p-1  cursor-pointer hover:text-amber-300 transition">
          {!favorites ? <img src={fav} alt="favorites" className="w-5 h-5" /> : <TiStar />}
          <span className="text-amber-50">Favorites</span>
        </div>

        <div onClick={() => setArchived(!archived)} className="flex items-center gap-3 p-1 cursor-pointer hover:text-amber-300 transition">
          {!archived ? <img src={archive} alt="archived" className="w-5 h-5" /> : <FaArchive />}
          <span className="text-amber-50">Archived </span>
        </div>
        <hr className='w-45 ' />
        <div onClick={() => setRemove(!remove)} className="flex items-center gap-3 p-1 cursor-pointer hover:text-amber-300 transition">
          {!remove ? <img src={trash} alt="trash" className="w-5 h-5" /> : <RiDeleteBin7Fill />
          }
          <span className="text-amber-50">Delete</span>
        </div>
      </div>
    </div>
  )
}

export default SidePopUp
