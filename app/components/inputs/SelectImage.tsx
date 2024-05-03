'use client';

import { ImageType } from "@/app/interfaces";
import { useCallback } from "react";
import {useDropzone} from 'react-dropzone'

interface Props {
    item?: ImageType;
    handleFileChange: (value: File)=> void;
}

export const SelectImage = ({item, handleFileChange}:Props) => {
    const onDrop = useCallback((acceptedFiles:File[]) => {
        if(acceptedFiles.length > 0 ) {
            handleFileChange(acceptedFiles[0])
        }
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {'image/*' : ['.jpeg', '.png']},
    })
  return (
    <div {...getRootProps()} className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center">
        <input {...getInputProps()} />
        {isDragActive 
            ? (<p>Suelta la imagen aqui...</p>)
            : (<p>+ {item?.color} Imagen</p>)
        }
    </div>
  )
}
