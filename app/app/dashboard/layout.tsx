"use client";
import {ReactNode} from 'react';
import Sidebar from '@/components/Sidebar';

const DashboardLayout = ({children}: {children: ReactNode}) => {
    return (
        <Sidebar>
            <>
            {children}
            </>
        </Sidebar>
    )
};

export default DashboardLayout;