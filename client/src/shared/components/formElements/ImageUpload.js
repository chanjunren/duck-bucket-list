import React, { useRef, useState, useEffect } from 'react';

import Button from './Button';

import './ImageUpload.css';

const ImageUpload = props => {
    const [file, setPickedFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    const pickImageHandler = () => {
        filePickerRef.current.click();    
    };

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {   
            setPreviewUrl(fileReader.result); 
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setPickedFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    return <div className="form-control">
        <input
            id={props.id}
            style={{ display: 'none' }}
            type="file"
            accept=".png,.jpg,.jpeg"
            ref={filePickerRef} 
            onChange={pickedHandler}/>
        <div className={`image-upload ${props.center && 'center'}`}>
            <div className={'image-upload__preview'}>
                {previewUrl && <img src={previewUrl} alt="Preview" />}
                {!previewUrl && <p>{props.initialMsg || `Please pick a dp!`}</p>}
            </div>
            <Button type="button" onClick={pickImageHandler}>{`Choose Picture :D`}</Button>
        </div>
    </div>
}

export default ImageUpload;