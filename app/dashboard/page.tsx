
import Dashboard from '@/components/Dashboard'
import { SidebarDashboard } from '@/components/Sidebar'
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
      <SidebarDashboard name = {session.user.name} image = {session.user.image}/>
      <div className = "">
        <Dashboard />
      </div>
    </div>
  )
}
export default Page;
