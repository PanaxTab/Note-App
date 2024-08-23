import Trash from '../icons/Trash.jsx';
import {setNewOffset, autoGrow, setZIndex} from '../utils.js';
import { useEffect,useRef,useState } from 'react';

const NoteCard = ({ note }) => {
  let mouseStartPos = {x:0,y:0};
  //Starting position of where the mouse clicked and then moved
  const cardRef = useRef(null);
  //Changes position of a note from a static variable to a static hook
  const [position,setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);
  
  const textAreaRef = useRef(null);
  
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
    };
  };
  
  const mouseUp = async () => {
    document.removeEventListener("mousemove",mouseMove);
    document.removeEventListener("mouseup", mouseUp)

    const newPosition = setNewOffset(cardRef.current);
    //setPosition(newPosition);
  };
  
  const mouseMove = (e) =>{
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX, 
      y: mouseStartPos.y - e.clientY,
    };
    
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
    
    const newPosition = setNewOffset(cardRef.current,mouseMoveDir);
    //setPosition(newPosition);
    setPosition({
      x: cardRef.current.offsetLeft - mouseMoveDir.x,
      y: cardRef.current.offsetTop - mouseMoveDir.y,
    });
  };
  
  

  
  return (
    <div 
      ref={cardRef} 
      className="card" 
      style={{ 
        backgroundColor: colors.colorBody, 
        left:`${position.x}px` , 
        top:`${position.y}px`
      }}
    >
      <div 
        onMouseDown={mouseDown} 
        className="card-header" 
        style={{
          backgroundColor: colors.colorHeader,
        }}
      >
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          onFocus={() => { 
            setZIndex(cardRef.current); 
            setSelectedNote(note);
          }}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
        >
        </textarea>
      </div>
    </div>
  );
};

export default NoteCard;
