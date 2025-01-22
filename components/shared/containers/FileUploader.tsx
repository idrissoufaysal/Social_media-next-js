import Image from 'next/image'
import Loader from '../Loader'
import { SetStateAction, Dispatch } from 'react';
import { UploadButton } from '@/utils/uploadthing';
import { useLoading } from '@/hooks/useLoading';
import axios from 'axios';

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    mediaUrl?: string;
    setImage: Dispatch<SetStateAction<string | undefined>>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FileUploader = ({ fieldChange, mediaUrl, setImage }: FileUploaderProps) => {
    const { isLoading, setIsLoading } = useLoading()

    const handleDelete = async (image: string) => {
        console.log('its working');
        const imageKey = image.substring(image.lastIndexOf('/') + 1)
        await axios.post('/api/uploadthing/delete', { imageKey })
            .then((res => {
                if (res.data.success) {
                    setImage('')
                }
            }))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((e:any)=>{
                console.log(e.message);
            })

    }

    return (
        <div className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>

            {
                isLoading ? <Loader /> : mediaUrl ?
                    (<div className='flex flex-1 w-full justify-center p-5 lg:p-10 flex-col' >
                        <Image src={mediaUrl}
                            alt='image'
                            height={70}
                            width={60}
                            className='file_uploader-img'
                        />
                        <p className='file_uploader-label' onClick={()=>handleDelete(mediaUrl)}>
                            click here to delete or replace
                        </p>
                    </div>
                    ) :
                    (
                        <div className='file_uploader-box bg-dark-3'>
                            <Image
                                src="/assets/icons/file-upload.svg"
                                alt='file'
                                height={95}
                                width={70}
                            />
                            <h3 className='base-medium text-light-2 mb-2 mt-6'>
                                Drag photo here
                            </h3>

                            <p className='text-light-4 mb-6'> SVG, PNG, JPG</p>
                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    setIsLoading(true)
                                    // Do something with the response
                                    console.log("Files: ", res);
                                    setImage(res[0].url)
                                    setIsLoading(false)
                                }}
                                onUploadError={(error: Error) => {
                                    // Do something with the error.
                                    alert(`ERROR! ${error.message}`);
                                }}
                            />
                        </div>
                    )
            }
        </div>
    )
}

export default FileUploader
