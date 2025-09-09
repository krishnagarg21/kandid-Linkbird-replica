'use client'

import React, { useState } from 'react'
import { useCreateCampaign } from '../../../lib/hooks/useCreateCampaign'

export default function CreateCampaignForm() {
  // Get the mutation object instead of destructuring
  const mutation = useCreateCampaign()

  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [startDate, setStartDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ name, status, startDate })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Campaign Name"
        required
        className="border p-2 w-full"
      />
      <input
        value={status}
        onChange={e => setStatus(e.target.value)}
        placeholder="Status"
        required
        className="border p-2 w-full"
      />
      <input
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <button
        type="submit"
        disabled={mutation.status === 'pending'}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {mutation.status === 'pending' ? 'Creating...' : 'Create Campaign'}
      </button>

      {mutation.status === 'error' && (
        <p style={{ color: 'red' }}>Error: {(mutation.error as Error).message}</p>
      )}
    </form>
  )
}
