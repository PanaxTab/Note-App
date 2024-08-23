import Trash from "../icons/Trash.jsx";
import {db} from "../appwrite/databases.js";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext.jsx";

export const DeleteButton = ({noteId}) => {
  const {setNotes} =useContext(NotesContext);
  const handleDelete = async (e) => {
    db.notes.delete(noteId);
    setNotes((prevState) => 
      prevState.filter((note) => note.$id !== noteId)
    );
  };

  return(
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};
