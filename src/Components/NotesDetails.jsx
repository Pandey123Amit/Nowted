import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dateIm from '../assets/date.svg';
import dotImg from '../assets/dot.svg';
import folderImg from '../assets/notes.svg';
import { useNotesDataById } from "../hooks/useFolderData";
import SidePopUp from "./SidePopUp";
import useDebounce from "../hooks/useDebounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import EmptyNotesView from "./EmptyView";


function NotesDetails() {
 const queryClient = useQueryClient();
  const [favorites, setFavorites] = useState(false)
  const [archived, setArchived] = useState(false)
  // const [isDtatChanges,setIsDtatChanges]=useState(false)
  const [remove, setRemove] = useState(false)
  const [dot, setDot] = useState(false)
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [contentValue, setContent] = useState("");
  const { notesId } = useParams()
  const { data,refetch } = useNotesDataById(notesId)

  
//  const {}= useFolderDataById(folderId);
 
 const debouncedValue= useDebounce(contentValue, 1000);

  // debouncedValue ? setIsDtatChanges(true):null

  const date = new Date(data?.createdAt).toLocaleDateString("en-GB");
  

    useEffect(() => {
      
      if (data?.content?.length){
        
        setContent(() => data?.content);
       setIsUserTyping(false); }
    }, [notesId, data?.content])
        console.log(contentValue,contentValue.length,"inside","debouncedValue",debouncedValue);

  const  updateTextMutation = useMutation({
    mutationFn: async (content) => {
      return await axios.patch(
        `https://nowted-server.remotestate.com/notes/${notesId}`,

        content,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    onSuccess:()=>{queryClient.invalidateQueries(["recent-key"]);
      refetch()
    },
    onError:(err)=>console.log(err,"kjk"),
    
  });

  useEffect(() => {
    // console.log(debouncedValue,"kyooo");
    // console.log(isUserTyping,"isUserTyping"); 
    // console.log('favorites',favorites);
    // console.log('archived111',archived);
    
     
    // //  updateTextMutation.mutate({
    //   isFavorite:favorites
    // });
    //  updateTextMutation.mutate({
    //   isArchived:remove
    // });
    //  updateTextMutation.mutate({
    //   isArchived:archived
    // });
   isUserTyping && updateTextMutation.mutate({
        content: debouncedValue,
      });
  }, [debouncedValue])
  // console.log('dot',dot);
  

  return (
    <>
    {data?.isArchived ?(<EmptyNotesView />):
      <div onClick={() => setDot(false)} className="bg-black-300 h-full w-full p-5">
      <div className="bg-black h-full w-full py-8 px-10">
        <div className="p-3 bg-black flex justify-between">
          <h1 className="text-amber-50 font-bold font-sans text-3xl">{data?.folder?.name}</h1>
          <div>
            <img onClick={(e) =>{
              e.stopPropagation();
              e.preventDefault()
              setDot(!dot)
            } }
              className="h-9  relative w-9 border bg-gray-800 rounded-full"
              src={dotImg}
              alt="dot"
            />
            <div className="absolute right-20 p-1">
              {dot && <SidePopUp 
                favorites={favorites}
                setFavorites={(val)=>{
                   setFavorites(val);
                   updateTextMutation.mutate({ isFavorite: val });
                }}
                archived={archived}
                setArchived={(val)=>{
                  console.log(val);
                  
                   setArchived(val);
                   updateTextMutation.mutate({ isArchived: val });
                }}
                remove={remove}
                setRemove={setRemove}

              />}
            </div>
          </div>
        </div>
        <div className="mt-2 p-3 w-fit">
          <div className="text-amber-800 flex justify-between gap-8">
            <img src={dateIm} />
            <p className="font-sans text-amber-50 font-bold gap-4" >Date</p>
            <p className="font-sans text-amber-50 font-bold underline gap-4">{date}</p>
          </div>
        </div>
        <hr className="w-full" />
        <div className="mt-2 p-3 w-fit">
          <div className="text-amber-800 flex justify-between gap-8">
            <img src={folderImg} />
            <p className="font-sans text-amber-50 font-bold gap-4" >Folder</p>
            <p className="font-sans text-amber-50 font-bold  gap-4">{data?.title}</p>
          </div>
        </div>
        <div className="bg-black p-10">
          <div>
            <textarea
              value={contentValue}
              onChange={(e) =>{ 
                
                setContent(e.target.value)
                 setIsUserTyping(true);
              }}
              className="w-full h-40 p-2 rounded resize-none outline-none bg-transparent text-white"
              placeholder="Start typing..."
            />
          </div>
        </div>
      </div>
    </div>}
</>
  )
}



export default NotesDetails



