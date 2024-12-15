
import Dashboard from '@/components/Dashboard'
import { SidebarDemo } from '@/components/Sidebar'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'


import React from 'react'

const Page = async () => {
  const session  = await getServerSession();
    if (!session || !session.user){
      redirect("/sign-in")
    }
  return (
    <div className = " w-full h-full flex flex-row">
      <SidebarDemo/>
      <div className = "">
        <Dashboard/>
      </div>
    </div>
  )
}
export default Page;
