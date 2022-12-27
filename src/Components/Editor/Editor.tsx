import { useRef, useState } from 'react';
import './Editor.css';

const Photo = () => {
    const [position, setPosition] = useState({x: 0, y: 0, zoom: 0});

    const imageMove = (e: any) =>{
        const moveX = position.x + e.movementX;
        const moveY = position.y + e.movementY;
        setPosition({x: moveX, y: moveY, zoom: 0})
    }

    const startDrag = (e: any) => {
        console.log("Drag");
    
        e.target.addEventListener('mousemove', imageMove);
    }
    
    const stopDrag = (e: any) => {
        console.log("stopDrag");
    
        e.target.removeEventListener('mousemove', imageMove);
    }

    /**
     * @type {HTMLImageElement}
     */


    const image = useRef<HTMLImageElement>(null);

    if(image.current !== null){
        const style = image.current.style;

        style.marginLeft = position.x + 'px';
        style.marginTop = position.y + 'px';
        style.width = 360+10*position.zoom + 'px';
        style.height = 360+10*position.zoom + 'px';
    }

    return(
        <div className="photo">
            <img className="image" ref={image} src="image.png" alt="" draggable="false" onMouseDown={startDrag} onMouseUp={stopDrag} />
        </div>
    )
}

const Editor = () => (
    <div className="container">
        <div className="header">Zdjęcie profilowe</div>
        <div className="subheader">Dodaj lub zmień obecne zdjęcie profilowe</div>
        <button className="button">Dodaj zdjęcie</button>
        <Photo />
    </div>
)

export default Editor;