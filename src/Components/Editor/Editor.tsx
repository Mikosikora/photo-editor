import { useEffect, useRef, useState } from 'react';
import './Editor.css';

let mouseDown = false;
window.onmousedown = () => {
    mouseDown = true;
    console.log('DOWN')
}
window.onmouseup = () => {
    mouseDown = false;
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
        <img className="image" ref={image} src={prop.url} alt="" draggable="false" />
    )
}

const Editor = () => {
    const [position, setPosition] = useState({x: 0, y: 0, zoom: 0});
    const [url, setURL] = useState('image.png');

    const file = useRef<HTMLInputElement>(null)

    const uploadImage = () => {
        if(file.current !== null){
            const img = file.current!.files![0];
            const obj = URL.createObjectURL(img);
            setURL(obj);
            console.log("uploaded");
        }
    }

    const zoom = (e: any) => {
        setPosition({x: position.x, y: position.y, zoom: e.target.value});
    }

    const moveEvent = (e: any) =>{
        if(mouseDown){
            var newX = position.x+e.movementX
            var newY = position.y+e.movementY

            setPosition({x: newX, y: newY, zoom: position.zoom})
            console.log("move");
        }
    }

    return(
        <div className="container">
            <div className="header">Zdjęcie profilowe</div>
            <div className="subheader">Dodaj lub zmień obecne zdjęcie profilowe</div>
            <input type="file" id="file" ref={file} onChange={uploadImage}/>
            <label htmlFor="file" className="button">Dodaj zdjęcie</label>
            <div className="area" onMouseMove={moveEvent} >
                <div className="mask-info">
                    <img src="mouse-drag.png" alt="" width="20" />
                    &nbsp; Przeciągaj i dopasuj
                </div>
                <svg width="360" height="360" className="mask">
                    <mask id="mask">
                        <rect fill="white" width="100%" height="100%"/>
                        <circle cx="180" cy="180" r="175" stroke="black" fill="black" />
                    </mask>
                    <rect mask="url(#mask)" fill="#ffffff99" width="100%" height="100%"/>
                </svg>
                <Image position={position} url={url} />
            </div>
            <div className="zoomConainer">
                <img src="sub-icon.png" alt="-" width="20" height="20" />
                <input className="slider" type="range" min="0" max="100" defaultValue="0" onInput={zoom}></input>
                <img src="add-icon.png" alt="+" width="20" />
            </div>
            <div className="cardFooter">
                <button className="cancelButton">Anuluj</button>
                <button className="orangeButton">Zapisz zmiany</button>
            </div>
        </div>
    )
}

export default Editor;