'use client'

import React, { useState } from 'react'
import { useCreateLead } from '../../../lib/hooks/useCreatedLid'

interface Props {
  campaignId: number
}

export default function CreateLeadForm({ campaignId }: Props) {
  const mutation = useCreateLead()

  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [description, setDescription] = useState('')
  const [activityLevel, setActivityLevel] = useState<number | undefined>(undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      campaignId,
      name,
      status,
      avatarUrl: avatarUrl || undefined,
      description: description || undefined,
      activityLevel,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white">
      <input
        className="border p-2 w-full"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Lead Name"
        required
      />
      <input
        className="border p-2 w-full"
        value={status}
        onChange={e => setStatus(e.target.value)}
        placeholder="Status"
        required
      />
      <input
        className="border p-2 w-full"
        value={avatarUrl}
        onChange={e => setAvatarUrl(e.target.value)}
        placeholder="Avatar URL"
      />
      <textarea
        className="border p-2 w-full"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        className="border p-2 w-full"
        value={activityLevel ?? ''}
        onChange={e => setActivityLevel(Number(e.target.value))}
        placeholder="Activity Level"
      />
      <button
        disabled={mutation.status === 'pending'}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        type="submit"
      >
        {mutation.status === 'pending' ? 'Creating...' : 'Create Lead'}
      </button>
      {mutation.status === 'error' && (
        <p className="text-red-600">Error: {(mutation.error as Error).message}</p>
      )}
    </form>
  )
}
