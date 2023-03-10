import React, { useState } from 'react';
import { FadeLoader } from 'react-spinners';
import './utility.css'

const Loading = () => {
    
    return (
        <div className='bg-bgclr  h-[100vh]'>
        <div className=' p-5'>
            <div className='flex items-center justify-between gap-20 '>
                <p class="mb-4 animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%] loading-css rounded-md"> <span
                class="inline-block min-h-[30px] w-40 cursor-wait bg-[#808080] align-middle text-base  opacity-50 "></span> </p>

                <p class="mb-4 animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%] loading-css  rounded-md"> <span
                class="inline-block min-h-[30px] w-60  cursor-wait bg-[#808080] align-middle text-base  opacity-50 "></span> </p>
            </div>

            <p class="mb-4 animate-pulse ">
                <span
                class="inline-block min-h-[30vh] w-full flex-auto cursor-wait bg-[#808080] align-middle text-base opacity-50  rounded-md"></span>
            </p>

            <div className='flex items-center justify-between gap-20'>
                <p class="mb-4 animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%] loading-css  rounded-md"> <span
                class="inline-block min-h-[25px] w-32 cursor-wait bg-[#808080] align-middle text-base  opacity-50 "></span> </p>

                <div className='flex items-center justify-end gap-3'>
                    <p class="mb-4 animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%] loading-css  rounded-md"> <span
                    class="inline-block min-h-[25px] w-14  cursor-wait bg-[#808080] align-middle text-base  opacity-50 "></span> </p>

                    <p class="mb-4 animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%] loading-css  rounded-md"> <span
                    class="inline-block min-h-[25px] w-9  cursor-wait bg-[#808080] align-middle text-base  opacity-50 "></span> </p>
                    
                    <p class="mb-4 animate-[placeholder-wave_2s_linear_infinite] [mask-size:200%_100%] loading-css  rounded-md"> <span
                    class="inline-block min-h-[25px] w-14  cursor-wait bg-[#808080] align-middle text-base  opacity-50 "></span> </p>

                </div>

                
            </div>
            
        </div>

        </div>
    );
};

export default Loading;