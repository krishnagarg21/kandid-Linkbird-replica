'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import React from 'react'
import LeadList from '../../components/LeadList'
import CreateLeadForm from '../../components/CreateLeadForm'
import { useLeads } from '../../../../lib/hooks/useLeads'

const campaignData = {
  name: 'Just Herbs',
  status: 'Active',
  totalLeads: 20,
  requestSent: 0,
  requestAccepted: 0,
  requestReplied: 0,
  startDate: '02/09/2025',
  conversionRate: 0.0,
  progress: [
    { label: 'Leads Contacted', value: 0 },
    { label: 'Acceptance Rate', value: 0 },
    { label: 'Reply Rate', value: 0 }
  ]
}

const placeholders = [
  { key: '{{fullName}}', description: 'Full Name' },
  { key: '{{firstName}}', description: 'First Name' },
  { key: '{{lastName}}', description: 'Last Name' },
  { key: '{{jobTitle}}', description: 'Job Title' },
]


// Leads tab component
function CampaignLeadsTab() {
  const params = useParams()
  const campaignId = Number(params.campaignId)
  const { data: leads, error, isLoading } = useLeads(campaignId)

  if (isLoading) return <p>Loading leads...</p>
  if (error) return <p>Error loading leads: {(error as Error).message}</p>

  return (
    <div className="space-y-6">
      <CreateLeadForm campaignId={campaignId} />
      <LeadList campaignId={campaignId} data={leads ?? []} />
    </div>
  )
}

function CampaignSequenceTab() {
  const [requestMsg, setRequestMsg] = useState(
    "Hi {{firstName}}, I’d love to connect and share some insights."
  )
  const [connectionMsg, setConnectionMsg] = useState(
    "Thanks for connecting {{firstName}}! Let's explore how we can collaborate."
  )
  const [firstFollowUp, setFirstFollowUp] = useState(
    'Just following up to see if you had a chance to review my previous message.'
  )
  const [secondFollowUp, setSecondFollowUp] = useState(
    'Hi {{firstName}}, wanted to reach out again to see if this is of interest.'
  )

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl space-y-8">
      {/* Available placeholders */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Available fields:</h3>
        <div className="flex flex-wrap gap-4">
          {placeholders.map(({ key, description }) => (
            <div key={key} className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-mono">
              {key} - {description}
            </div>
          ))}
        </div>
      </div>

      {/* Request Message */}
      <section>
        <h4 className="font-semibold mb-1">Request Message</h4>
        <textarea
          rows={4}
          className="w-full border border-gray-300 rounded p-3 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={requestMsg}
          onChange={(e) => setRequestMsg(e.target.value)}
          maxLength={270}
          placeholder="Write your request message here..."
        />
        <div className="mt-1 text-sm text-gray-500 flex justify-between">
          <span>{requestMsg.length}/270 characters</span>
          <div>
            <button className="mr-2 px-4 py-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-700">Preview</button>
            <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
          </div>
        </div>
      </section>

      {/* Connection Message */}
      <section>
        <h4 className="font-semibold mb-1">Connection Message</h4>
        <textarea
          rows={4}
          className="w-full border border-gray-300 rounded p-3 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={connectionMsg}
          onChange={(e) => setConnectionMsg(e.target.value)}
          maxLength={270}
          placeholder="Write your connection message here..."
        />
        <div className="mt-1 text-sm text-gray-500 flex justify-between">
          <span>{connectionMsg.length}/270 characters</span>
          <div>
            <button className="mr-2 px-4 py-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-700">Preview</button>
            <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
          </div>
        </div>
      </section>

      {/* First Follow-up Message */}
      <section>
        <h4 className="font-semibold mb-1">First Follow-up Message</h4>
        <textarea
          rows={3}
          className="w-full border border-gray-300 rounded p-3 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={firstFollowUp}
          onChange={(e) => setFirstFollowUp(e.target.value)}
          placeholder="Write your first follow-up message here..."
        />
        <div className="mt-2 flex items-center gap-2 text-sm">
          <label htmlFor="firstFollowUpDelay">Send</label>
          <select
            id="firstFollowUpDelay"
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="1"
          >
            <option value="0">Immediately</option>
            <option value="1">1 day</option>
            <option value="2">2 days</option>
            <option value="3">3 days</option>
            <option value="5">5 days</option>
          </select>
          <span>After Welcome Message</span>
        </div>
        <div className="mt-1 flex justify-end gap-2">
          <button className="px-4 py-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-700">Preview</button>
          <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </section>

      {/* Second Follow-up Message */}
      <section>
        <h4 className="font-semibold mb-1">Second Follow-up Message</h4>
        <textarea
          rows={3}
          className="w-full border border-gray-300 rounded p-3 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={secondFollowUp}
          onChange={(e) => setSecondFollowUp(e.target.value)}
          placeholder="Write your second follow-up message here..."
        />
        <div className="mt-2 flex items-center gap-2 text-sm">
          <label htmlFor="secondFollowUpDelay">Send</label>
          <select
            id="secondFollowUpDelay"
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="1"
          >
            <option value="0">Immediately</option>
            <option value="1">1 day</option>
            <option value="2">2 days</option>
            <option value="3">3 days</option>
            <option value="5">5 days</option>
          </select>
          <span>After First Follow-up</span>
        </div>
        <div className="mt-1 flex justify-end gap-2">
          <button className="px-4 py-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-700">Preview</button>
          <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </section>
    </div>
  )
}

function CampaignSettingsTab() {
  const [campaignName, setCampaignName] = useState('Just Herbs')
  const [campaignStatus, setCampaignStatus] = useState(true) // true = Active
  const [personalization, setPersonalization] = useState(true) // Request with personalization
  const [autoPilot, setAutoPilot] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState('Jivesh Lakhani')

  const accounts = ['Jivesh Lakhani', 'Another Account', 'Account 3']

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-3xl space-y-6">
      <section>
        <h3 className="text-lg font-semibold mb-4">Campaign Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="campaignName">Campaign Name</label>
            <input
              type="text"
              id="campaignName"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700" htmlFor="campaignStatus">Campaign Status</label>
            <input
              type="checkbox"
              id="campaignStatus"
              checked={campaignStatus}
              onChange={() => setCampaignStatus(!campaignStatus)}
              className="h-5 w-5 rounded border-gray-300"
            />
            <span className="text-sm">{campaignStatus ? 'Active' : 'Inactive'}</span>
          </div>

          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700" htmlFor="personalization">
              Request without personalization
            </label>
            <input
              type="checkbox"
              id="personalization"
              checked={!personalization}
              onChange={() => setPersonalization(!personalization)}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>

          <div className="mt-6 border rounded p-4 bg-gray-50 space-y-4">
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700" htmlFor="autoPilot">AutoPilot Mode</label>
              <input
                type="checkbox"
                id="autoPilot"
                checked={autoPilot}
                onChange={() => setAutoPilot(!autoPilot)}
                className="h-5 w-5 rounded border-gray-300"
              />
            </div>

            <div>
              <label htmlFor="selectedAccount" className="block text-sm font-medium text-gray-700 mb-1">Select LinkedIn Account</label>
              <select
                id="selectedAccount"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                disabled={autoPilot}
              >
                {accounts.map((acc) => (
                  <option key={acc} value={acc}>
                    {acc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
              onClick={() => alert('Save functionality to be implemented')}
            >
              Save All Changes
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}


const tabs = [
  { name: 'Overview', icon: <span role="img" aria-label="overview">🏠</span> },
  { name: 'Leads', icon: <span role="img" aria-label="leads">👥</span> },
  { name: 'Sequence', icon: <span role="img" aria-label="sequence">📧</span> },
  { name: 'Settings', icon: <span role="img" aria-label="settings">⚙️</span> },
]

export default function CampaignDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/dashboard/campaign" className="hover:underline">Campaign</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{campaignData.name}</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold">Campaign Details</h1>
        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded font-semibold">{campaignData.status}</span>
      </div>
      <p className="text-gray-500 mb-6">Manage and track your campaign performance</p>

      <nav className="flex gap-6 mb-8 border-b border-gray-100">
        {tabs.map(tab => (
          <button
            key={tab.name}
            className={`py-2 px-4 text-sm font-semibold flex items-center gap-2 ${
              activeTab === tab.name
                ? 'text-blue-700 border-b-2 border-blue-700'
                : 'text-gray-600'
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            <span>{tab.icon}</span> {tab.name}
          </button>
        ))}
      </nav>

      {activeTab === 'Overview' && (
        <div>
          {/* Smaller cards for metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-md shadow p-6 flex flex-col items-center justify-center text-center h-24">
              <span className="text-xs text-gray-500 mb-1">Total Leads</span>
              <span className="text-xl font-bold text-gray-900">{campaignData.totalLeads}</span>
            </div>
            <div className="bg-white rounded-md shadow p-6 flex flex-col items-center justify-center text-center h-24">
              <span className="text-xs text-gray-500 mb-1">Request Sent</span>
              <span className="text-lg text-gray-700">{campaignData.requestSent}</span>
            </div>
            <div className="bg-white rounded-md shadow p-6 flex flex-col items-center justify-center text-center h-24">
              <span className="text-xs text-gray-500 mb-1">Request Accepted</span>
              <span className="text-lg text-gray-700">{campaignData.requestAccepted}</span>
            </div>
            <div className="bg-white rounded-md shadow p-6 flex flex-col items-center justify-center text-center h-24">
              <span className="text-xs text-gray-500 mb-1">Request Replied</span>
              <span className="text-lg text-gray-700">{campaignData.requestReplied}</span>
            </div>
          </div>
          {/* Row for Process & Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Campaign Progress */}
            <div className="bg-white rounded-md shadow p-6">
              <h2 className="text-sm font-semibold mb-4">Campaign Progress</h2>
              <div className="space-y-4">
                {campaignData.progress.map((prog) => (
                  <div key={prog.label}>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>{prog.label}</span>
                      <span>{prog.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${prog.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Campaign Details */}
            <div className="bg-white rounded-md shadow p-6 flex flex-col justify-center text-left">
              <div className="mb-2">
                <span className="text-xs text-gray-500">Start Date</span>
                <div className="text-sm text-gray-900">{campaignData.startDate}</div>
              </div>
              <div className="mb-2">
                <span className="text-xs text-gray-500">Status</span>
                <div>
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-semibold">{campaignData.status}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-500">Conversion Rate</span>
                <div className="text-sm text-gray-900">{campaignData.conversionRate}%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Leads' && <CampaignLeadsTab />}

      {activeTab === 'Sequence' && <CampaignSequenceTab />}

      {activeTab === 'Settings' && <CampaignSettingsTab />}

    </section>
  )
}
