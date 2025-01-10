import { useState } from "react"

export const useFileUrl=()=>{
     const [imageUrl,setImageUrl]=useState<string | undefined >('')
    return {imageUrl,setImageUrl}
}