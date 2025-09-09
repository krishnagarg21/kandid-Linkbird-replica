'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Leads', href: '/dashboard/leads' },
  { name: 'Campaigns', href: '/dashboard/campaign' },
  { name: 'Messages', href: '/dashboard/messages' },
  { name: 'LinkedIn Accounts', href: '/dashboard/linkedin-accounts' },
  { name: 'Settings', href: '/dashboard/settings' },
]

export default function SideNav() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`bg-white border-r border-gray-200 ${collapsed ? 'w-20' : 'w-64'} transition-width duration-300 flex flex-col`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="text-lg font-bold text-blue-600 select-none whitespace-nowrap">
          {collapsed ? 'LB' : 'LinkBird'}
        </div>
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-500 focus:outline-none">
          {collapsed ? '→' : '←'}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto pt-4">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 mx-3 rounded-md text-sm font-medium select-none truncate ${
                isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-current={isActive ? 'page' : undefined}
              title={item.name}
            >
              {!collapsed && item.name}
              {collapsed && item.name.charAt(0)}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button className="w-full text-left text-gray-700 hover:text-blue-600 text-sm font-semibold">
          Logout
        </button>
      </div>
    </aside>
  )
}
