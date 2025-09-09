'use client'

import { useState } from 'react'
import LeadDetailSideSheet from './LeadDetailSideSheet'

const dummyLeads = [
  {
    id: 1,
    name: 'Dr. Bhuvaneshwari',
    title: 'Fertility & Women’s Health',
    email: 'bhuvaneshwari@example.com',
    company: 'HealthPlus',
    campaign: 'Gynoveda',
    profilePic: '',
    interactions: [
      { type: 'Invitation Request', message: "Hi, let's connect!", timestamp: '2025-08-30' },
      { type: 'Follow-up 1', message: 'Just checking in.', timestamp: '2025-09-01' }
    ],
    status: 'Pending'
  },
  {
    id: 2,
    name: 'Surdeep Singh',
    title: 'SEO Growth Expert',
    email: 'surdeep@example.com',
    company: 'TechBoost',
    campaign: 'Gynoveda',
    profilePic: '/avatars/surdeep_singh.jpg',
    interactions: [
      { type: 'Invitation Request', message: 'Hello!', timestamp: '2025-08-28' },
      { type: 'Follow-up 1', message: 'Following up on my last message.', timestamp: '2025-08-30' }
    ],
    status: 'Converted'
  },
]

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<typeof dummyLeads[0] | null>(null)

  return (
    <section className="p-6 bg-gray-50 min-h-screen relative">
      <h1 className="text-2xl font-semibold mb-6">Leads</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-4 flex justify-between items-center">
          <input
            type="search"
            placeholder="Search leads..."
            className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="responded">Responded</option>
            <option value="converted">Converted</option>
          </select>
        </div>
        <table className="min-w-full text-left text-sm divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Lead Name/Contact</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Campaign Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Contact Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dummyLeads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-3 flex items-center gap-3">
                  {lead.profilePic ? (
                    <img src={lead.profilePic} alt={lead.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-600">
                      {lead.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-xs text-gray-500">{lead.title}</div>
                  </div>
                </td>
                <td className="px-4 py-3">{lead.email}</td>
                <td className="px-4 py-3">{lead.company}</td>
                <td className="px-4 py-3">{lead.campaign}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded ${
                      lead.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : ''
                    } ${
                      lead.status === 'Converted' ? 'bg-green-100 text-green-700' : ''
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3">2025-09-01</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLead && (
        <>
          <div
            className="fixed inset-0 bg-black/25 z-40"
            onClick={() => setSelectedLead(null)}
          />
          <div className="fixed inset-y-0 right-0 z-50 flex">
            <LeadDetailSideSheet lead={selectedLead} onClose={() => setSelectedLead(null)} />
          </div>
        </>
      )}
    </section>
  )
}
