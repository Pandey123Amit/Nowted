import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'



//  const folderId = params.folderId


const getFolder = async () => {
  const res = await axios.get('https://nowted-server.remotestate.com/folders')
  // console.log(res.data.folders);
  return res.data
}

// console.log(getFolder(),"jh");

export function useFolderData() {
  return useQuery({
    queryKey: ['folders'],
    queryFn: getFolder,
  })
}

const getFolderById = async (folderId) => {
  // console.log("getFolderById", folderId);

  const res = await axios.get(
    `https://nowted-server.remotestate.com/notes?archived=false&deleted=false&folderId=${folderId}&page=1&limit=10`
  );
  console.log("folderid",res.data);

  return res.data;
};


export function useFolderDataById(folderId) {
  return useQuery({
    queryKey: ["foldersById", folderId],
    queryFn: () => getFolderById(folderId),
    enabled: !!folderId,
    
  })
}

const getNotesById = async (notesId) => {
  // console.log("getnotesIdById", notesId);

  const res = await axios.get(
    // `https://nowted-server.remotestate.com/notes/aabaaf87-d98e-45b2-bb82-6ea818e0ddf4`
    `https://nowted-server.remotestate.com/notes/${notesId}`
  );
  // console.log("notes llll", res.data);

  return res.data.note;
};

export function useNotesDataById(notesId) {
  return useQuery({
    queryKey: ["notesById", notesId],
    queryFn: () => getNotesById(notesId),
    enabled: !!notesId,
  })
}




