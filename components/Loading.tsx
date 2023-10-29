import { cn } from '@/lib/utils';
import React from 'react';
import ReactLoading from 'react-loading';
interface Loagin {
    className?: string
}
export default function Loading ({ className}:Loagin ){
    return (
        <div>
            <ReactLoading type='bubbles' className={cn(className)} color={"#FFFFFF"} height={'24px'} width={'30px'} />
        </div>
    )
    }
 