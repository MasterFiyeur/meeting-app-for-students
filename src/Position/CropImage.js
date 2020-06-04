import React from 'react';
import AvatarEditor from 'react-avatar-editor';

const ImageCrop = ({ imageSrc, onCrop, setEditorRef, scaleValue, onScaleChange}) => (
    <div>
        <AvatarEditor image={imageSrc} border={20} scale={scaleValue} ref={setEditorRef} />
        <input style={{ width:"50%"}} type="range" value={scaleValue} min="1" max="10" step="0.05" onChange={onScaleChange}/>
        <button onClick={onCrop}>Crop it!</button>
    </div>
);

export default ImageCrop;