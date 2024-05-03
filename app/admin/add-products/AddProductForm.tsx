'use client';

import { Button, CustomCheckBox, Heading, Input, TextArea } from "@/app/components";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { categories } from '../../../utils/categories';
import { CategoryInput } from "@/app/components/inputs/CategoryInput";
import { colors } from "@/utils";
import { SelectColor } from "@/app/components/inputs/SelectColor";
import { ImageType, UploadedImageType } from "@/app/interfaces";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

export const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<ImageType[] | null>();
    const [isProductCreated, setIsProductCreated] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            brand: '',
            category: '',
            inStock: false,
            images: [],
            price: ""
        }
    });

    useEffect(() => {
        setCustomValue('images', images)
    }, [images]);

    useEffect(() => {
        if (isProductCreated) {
            reset();
            setImages(null);
            setIsProductCreated(false);
        }
    }, [isProductCreated])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("Product data", data);
        setIsLoading(true);
        let uploadedImages: UploadedImageType[] = []

        if (!data.category) {
            setIsLoading(false)
            return toast.error('Catergoria no seleccionada')
        }
        if (!data.images || data.images.length === 0) {
            setIsLoading(false)
            return toast.error('No seleccionaste ninguna imagen')
        }

        const handleImageUploads = async () => {
            toast("Creando producto, por favor espere...")
            const storage = getStorage(firebaseApp);

            try {
                for (const item of data.images) {
                    if (item.image) {
                        const fileName = new Date().getTime() + '-' + item.image.name;
                        const storageRef = ref(storage, `products/${fileName}`);
                        const uploadTask = uploadBytesResumable(storageRef, item.image);

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on(
                                'state_changed',
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                        case 'paused':
                                            console.log('Upload is paused');
                                            break;
                                        case 'running':
                                            console.log('Upload is running');
                                            break;
                                    }
                                },
                                (error) => {
                                    // Manejar errores aquí
                                    console.log("error en cargar la imagen", error);
                                    reject(error);
                                },
                                () => {
                                    // La carga se ha completado exitosamente
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push({
                                            ...item,
                                            image: downloadURL
                                        })
                                        console.log('File available at', downloadURL);
                                        resolve()
                                    })
                                    .catch((error)=> {
                                        console.log("Error recibiendo el url de descarga");
                                        reject(error);
                                    })
                                }
                            );
                        });
                    }
                }
            } catch (error) {
                setIsLoading(false)
                console.error("Error uploading images:", error);
                return toast.error("Error al cargar las imagenes")
            }
        };

        await handleImageUploads();
        const productData = {...data, images: uploadedImages}
        
        axios.post('/api/product', productData).then(()=> {
            toast.success('Producto creado')
            setIsProductCreated(true);
            router.refresh()
        }).catch(error=> {
            toast.error('Error al crear el producto');
        }).finally(()=> {
            setIsLoading(false);
        });
    }


    const category = watch('category');
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (!prev) {
                return [value];
            }
            return [...prev, value]
        })
    }, [])
    const removeImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (prev) {
                const filteredImages = prev.filter((item) => item.color !== value.color)
                return filteredImages;
            }
            return prev
        })
    }, [])
    return (
        <>
            <Heading title="Agregar un Producto" center />
            <Input
                id="name"
                label="Nombre"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="price"
                label="Precio"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="number"
                required
            />
            <Input
                id="brand"
                label="Marca"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <TextArea
                id="description"
                label="Descripción"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <CustomCheckBox id="inStock" register={register} label="Este producto esta en stock" />
            <div className="w-full font-medium">
                <div className="mb-2 font-semibold">Seleccione una categoria</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-auto">
                    {categories.map(item => {
                        if (item.label === 'Todos') return null
                        return (
                            <div key={item.label} className="col-span">
                                <CategoryInput
                                    onClick={(category) => setCustomValue('category', category)}
                                    selected={category === item.label}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-full flex flex-col flex-wrap gap-4">
                <div>
                    <div className="font-bold">
                        Selecciona los colores disponibles del producto y sube sus imagenes
                    </div>
                    <div className="text-sm">
                        Debes subir una imagen por cada color seleccionado de lo contrario tu color sera ignorado
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {colors.map((item, index) => (
                        <SelectColor key={index}
                            item={item}
                            addImageToState={addImageToState}
                            removeImageFromState={removeImageToState}
                            isProductCreated={isProductCreated}
                        />
                    ))}
                </div>
            </div>
            <Button
                label={isLoading ? 'Cargando...' : 'Agregar Producto'}
                onClick={handleSubmit(onSubmit)}
            />
        </>
    )
}
