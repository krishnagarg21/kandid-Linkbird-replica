'use client'

import { useState } from 'react'
import Link from 'next/link'
import CreateCampaignForm from '../components/CreateCampaignForm'



type CampaignStatus = 'Active' | 'Draft' | 'Paused' | 'Completed'

const dummyCampaigns: {
  id: number
  name: string
  status: CampaignStatus
  totalLeads: number
  requestAccepted: number
  requestSent: number
  requestReplied: number
  connectionCount: number
  responseRate: number
}[] = [
  {
    id: 1,
    name: 'Just Herbs',
    status: 'Active',
    totalLeads: 20,
    requestAccepted: 0,
    requestSent: 20,
    requestReplied: 5,
    connectionCount: 0,
    responseRate: 10,
  },
  {
    id: 2,
    name: 'Juicy Chemistry',
    status: 'Active',
    totalLeads: 11,
    requestAccepted: 2,
    requestSent: 11,
    requestReplied: 1,
    connectionCount: 0,
    responseRate: 27,
  },
]

const statusBadges: Record<CampaignStatus, string> = {
  Active: 'bg-green-100 text-green-700',
  Draft: 'bg-gray-200 text-gray-600',
  Paused: 'bg-yellow-100 text-yellow-700',
  Completed: 'bg-blue-100 text-blue-700',
}

export default function CampaignsPage() {
  const [filter, setFilter] = useState<'All' | CampaignStatus>('All')

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <CreateCampaignForm />
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <button className={`px-4 py-1 rounded-full text-sm font-semibold ${filter === 'All' ? 'bg-blue-100 text-blue-700' : 'bg-white border border-gray-300 text-gray-700'}`} onClick={() => setFilter('All')}>All Campaigns</button>
          <button className={`px-4 py-1 rounded-full text-sm font-semibold ${filter === 'Active' ? 'bg-blue-100 text-blue-700' : 'bg-white border border-gray-300 text-gray-700'}`} onClick={() => setFilter('Active')}>Active</button>
          <button className={`px-4 py-1 rounded-full text-sm font-semibold ${filter === 'Paused' ? 'bg-blue-100 text-blue-700' : 'bg-white border border-gray-300 text-gray-700'}`} onClick={() => setFilter('Paused')}>Inactive</button>
        </div>
        <div className="flex items-center space-x-4">
          <input type="search" className="border border-gray-300 rounded px-4 py-2 w-52 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search campaigns..." />
          <button className="bg-blue-600 text-white px-4 py-2 rounded font-medium text-sm shadow hover:bg-blue-700">Create Campaign</button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 font-normal text-xs">
            <tr>
              <th className="py-3 px-4 text-left">Campaign Name</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="2" d="M10 2v16m8-8H2" /></svg>
                  Total Leads
                </span>
              </th>
              <th className="py-3 px-4 text-center">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="currentColor" /></svg>
                  <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 16 16"><rect width="16" height="8" y="4" fill="currentColor" /></svg>
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 16 16"><rect width="8" height="16" x="4" fill="currentColor" /></svg>
                  Request Status
                </span>
              </th>
              <th className="py-3 px-4 text-center">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path stroke="currentColor" strokeWidth="2" d="M8 12l2 2l4-4" /></svg>
                  Connection Status
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {dummyCampaigns
              .filter(c => filter === 'All' ? true : c.status === filter)
              .map(campaign => (
                <tr key={campaign.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-medium">
                    <Link href={`/dashboard/campaign/${campaign.id}`} className="text-blue-700 hover:underline">
                      {campaign.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${statusBadges[campaign.status]}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">{campaign.totalLeads}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <span className="inline-flex items-center gap-1 text-xs">
                      <span className="text-green-600 font-bold">{campaign.requestAccepted}</span>
                      <span className="text-yellow-700 font-bold">{campaign.requestSent}</span>
                      <span className="text-blue-600 font-bold">{campaign.requestReplied}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="inline-block w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <span className="inline-block h-2 bg-blue-600 rounded-full" style={{ width: `${campaign.responseRate}%` }}></span>
                      </span>
                      <span className="text-xs font-medium">{campaign.responseRate}%</span>
                      <button className="p-1 rounded hover:bg-gray-200">
                        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeWidth="2" d="M18 6L10 14L2 6" />
                        </svg>
                      </button>
                      <button className="p-1 rounded hover:bg-gray-200">
                        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 20 20">
                          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
