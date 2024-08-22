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
  useEffect(() => {
    autoGrow(textAreaRef);
  }, [])
  
  
  
  
  const mouseUp = async () => {
    document.removeEventListener("mousemove",mouseMove);
    document.removeEventListener("mouseup", mouseUp)

    const newPosition = setNewOffset(cardRef.current);
    setPosition(newPosition);
  };
  
  const mouseDown = (e) =>{
    if (e.target.className ==="card-header"){
      setZIndex(cardRef.current);
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;
      document.addEventListener("mousemove",mouseMove);
      document.addEventListener("mouseup", mouseUp)
    };
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
  
  const textAreaRef = useRef(null);

  
  return (
    <div ref={cardRef} className="card" style={{ backgroundColor: colors.colorBody, left:`${position.x}px` , top:`${position.y}px`}}>
      <div onMouseDown={mouseDown} className="card-header" style={{
        
        backgroundColor: colors.colorHeader,
      }}
      >
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          style={{ color: colors.colorText }}
          defaultValue={body}
          ref={textAreaRef}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => { setZIndex(cardRef.current); }}
        >
        </textarea>
      </div>
    </div>
  );
};

export default NoteCard;
