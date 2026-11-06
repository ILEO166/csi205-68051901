'use client'

import Link from 'next/link'

import { Badge } from "@/components/tailgrids/core/badge";
import { Facebook} from "@tailgrids/icons";
import 'bootstrap-icons/font/bootstrap-icons.min.css';

export default function Footer() {
    return (
        // footer container
        <div className='mt-4 text-center'>
            
            {/* student */}
            <div>
                <Badge className='text-xl text-black'>68051901 นายศรัณยพงศ์ แซ่อึ้ง</Badge>
            </div>
            
            {/* contacts */}
            <div className='mt-2 flex justify-center align-middle gap-6'>
                
                <Link href={'https://www.facebook.com/mhuwhan.stilltogether'} target='_blank'>
                <Facebook className='text-blue-600 translate-y-0.5' />
                </Link>

                <div className='border-l'></div>
                <Link href={'https://www.youtube.com/@mhuwhan'} target='_blank'>
                <span className='bi bi-youtube text-2xl text-red-500'></span></Link>
            </div>

        </div>
    )
}