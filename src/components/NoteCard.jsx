import {setNewOffset, autoGrow, setZIndex} from '../utils.js';
import { useEffect,useRef,useState,useContext } from 'react';
import { db } from '../appwrite/databases.js';
import { DeleteButton } from './DeleteButton.jsx';
import { NotesContext } from '../context/NotesContext.jsx';


const NoteCard = ({ note }) => {
  let mouseStartPos = {x:0,y:0};
  //Starting position of where the mouse clicked and then moved
  const cardRef = useRef(null);
  const textAreaRef = useRef(null);
  const keyUpTimer = useRef(null);
  //Changes position of a note from a static variable to a static hook
  const [position,setPosition] = useState(JSON.parse(note.position));
  const [saving, setSaving] = useState(false);
  const { setSelectedNote } = useContext(NotesContext);
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);
  


  
  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);


  const mouseDown = (e) =>{
    if (e.target.className ==="card-header"){
      setZIndex(cardRef.current);
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;
      document.addEventListener("mousemove",mouseMove);
      document.addEventListener("mouseup", mouseUp)
      setSelectedNote(note);
    };
  };
  
  const mouseUp = async () => {
    document.removeEventListener("mousemove",mouseMove);
    document.removeEventListener("mouseup", mouseUp)

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };
  
  const mouseMove = (e) =>{
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX, 
      y: mouseStartPos.y - e.clientY,
    };
    
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    
    const newPosition = setNewOffset(cardRef.current,mouseMoveDir);
    setPosition(newPosition);
  };
  
  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
        await db.notes.update(note.$id, payload);
    } catch (error) {
        console.error(error);
    }
    setSaving(false);
  };

  const handleKeyUp = async () => {
    setSaving(true);

    if(keyUpTimer.current){
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(()=>{
      saveData("body",textAreaRef.current.value);
    },2000);
  };

  return (
    <div 
      ref={cardRef} 
      className="card" 
      style={{ 
        backgroundColor: colors.colorBody, 
        left:`${position.x}px` , 
        top:`${position.y}px`
      }
    }
    >
      <div 
        onMouseDown={mouseDown} 
        className="card-header" 
        style={{
          backgroundColor: colors.colorHeader,
        }}
      >
      <DeleteButton noteId={note.$id}/>
      {
        saving && (
          <div className="cad-saving">
            <span style={{color:colors.colorText}}>
              Saving...
            </span>
          </div>
        )
      }
      </div>
      <div className="card-body">
        <textarea
          onFocus={() => { 
            setSelectedNote(note);
            setZIndex(cardRef.current); 
          }}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          onKeyUp={handleKeyUp}
          defaultValue={body}
        >
        </textarea>
      </div>
    </div>
  );
};

export default NoteCard;
