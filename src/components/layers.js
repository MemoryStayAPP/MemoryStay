import { useEffect, useState } from "react"
import { ReactComponent as LayersIcon } from '../assets/svg/layers-icon.svg';
export default function Layers() {
return(
<div className="flex justify-center items-center w-screen h-screen">
    <div className="h-24 w-24 shadow-2xl bg-white rounded-lg" >
        <div className="flex justify-start items-end w-full h-full pl-2 pb-2">   
            <LayersIcon className="w-6 h-6 fill-black" />
            <p className="text-black text-sm">Layers</p>
        </div>   
        
    </div>
</div>
)
}
export function SelectLayers() {
    return(
<div className="flex justify-center items-center wn-screen h-screen">
    <div className="h-96 w-60 shadow-2xl bg-white rounded-lg">       
         
    </div>
</div>
    )

}