import { useEffect, useRef, useState } from 'react';
import './Editor.css';

let mouseDown = 0;
window.onmousedown = () => {
    ++mouseDown;
    console.log('DOWN')
}
window.onmouseup = () => {
    --mouseDown;
    console.log('UP')
}

const Image = (prop: any) => {
    const image = useRef<HTMLImageElement>(null);
    
    useEffect(() => {
        const move = () => {
            if(image.current !== null){
                const style = image.current.style;
                style.left = prop.position.x + 'px';
                style.top = prop.position.y + 'px';
                style.transform = "scale("+ (1+prop.position.zoom/10)+")";
            }
        }

        move();
    }, [prop.position]);

    return(
        <img className="image" ref={image} src="image.png" alt="" draggable="false" />
    )
}

const Editor = () => {
    const [position, setPosition] = useState({x: 0, y: 0, zoom: 0});

    const zoom = (e: any) => {
        setPosition({x: position.x, y: position.y, zoom: e.target.value});
    }

    const moveEvent = (e: any) =>{
        if(mouseDown){
            var newX = position.x+e.movementX
            var newY = position.y+e.movementY

            if(newX>((360*(1+position.zoom/10))-360)/2) return
            if(newY>((360*(1+position.zoom/10))-360)/2) return

            if(newX<((360-360*(1+position.zoom/10)))/2) return
            if(newY<((360-360*(1+position.zoom/10)))/2) return

            setPosition({x: newX, y: newY, zoom: position.zoom})
            console.log("move");
        }
    }

    return(
        <div className="container">
            <div className="header">Zdjęcie profilowe</div>
            <div className="subheader">Dodaj lub zmień obecne zdjęcie profilowe</div>
            <button className="button">Dodaj zdjęcie</button>
            <div className="area" onMouseMove={moveEvent} >
                <Image position={position} />
            </div>
            <div className="zoomConainer">
                <input className="slider" type="range" min="0" max="100" defaultValue="0" onInput={zoom}></input>
            </div>
        </div>
    )
}

export default Editor;