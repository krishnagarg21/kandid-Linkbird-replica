'use client'

import React, { useState } from 'react'
import { useUpdateLead } from '../../../lib/hooks/useUpdateLead'
import { useDeleteLead } from '../../../lib/hooks/useDeleteLead'

interface Lead {
  id: number
  campaignId: number
  name: string
  status: string
  avatarUrl?: string
  description?: string
  activityLevel?: number
}

interface Props {
  campaignId: number
  data: Lead[]
}

export default function LeadList({ campaignId, data }: Props) {
  const updateLeadMutation = useUpdateLead()
  const deleteLeadMutation = useDeleteLead()

  const [editingLeadId, setEditingLeadId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<{
        name: string
        status: string
        avatarUrl?: string
        description?: string
        activityLevel?: number
        }>({
        name: '',
        status: '',
        avatarUrl: '',
        description: '',
        activityLevel: 0,
    })


  const startEdit = (lead: Lead) => {
    setEditingLeadId(lead.id)
    setEditForm({
      name: lead.name,
      status: lead.status,
      avatarUrl: lead.avatarUrl || '',
      description: lead.description || '',
      activityLevel: lead.activityLevel ?? 0,
    })
  }

  

  const cancelEdit = () => {
    setEditingLeadId(null)
    setEditForm({
        name: '',
        status: '',
        avatarUrl: '',
        description: '',
        activityLevel: 0,
    })
  }

  const saveEdit = () => {
  if (!editForm.name || !editForm.status) {
    alert('Name and status are required')
    return
  }
  updateLeadMutation.mutate(
    { id: editingLeadId!, campaignId, ...editForm },
    { onSuccess: cancelEdit }
  )
}

  const confirmDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      deleteLeadMutation.mutate({ id, campaignId })
    }
  }

  if (!Array.isArray(data)) {
    return <p>No leads available.</p>
  }
  return (
    <ul className="space-y-4">
      {data.map((lead) => (
        <li key={lead.id} className="border p-4 rounded">
          {editingLeadId === lead.id ? (
            <div className="space-y-2">
              <input
                className="border p-1 w-full"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Name"
              />
              <input
                className="border p-1 w-full"
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                placeholder="Status"
              />
              <input
                className="border p-1 w-full"
                value={editForm.avatarUrl}
                onChange={(e) => setEditForm({ ...editForm, avatarUrl: e.target.value })}
                placeholder="Avatar URL"
              />
              <textarea
                className="border p-1 w-full"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Description"
              />
              <input
                type="number"
                className="border p-1 w-full"
                value={editForm.activityLevel}
                onChange={(e) =>
                  setEditForm({ ...editForm, activityLevel: Number(e.target.value) })
                }
                placeholder="Activity Level"
              />
              <div className="flex gap-2">
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded"
                  onClick={saveEdit}
                  disabled={updateLeadMutation.status === 'pending'}
                >
                  {updateLeadMutation.status === 'pending' ? 'Saving...' : 'Save'}
                </button>
                <button className="bg-gray-300 px-2 py-1 rounded" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
              {updateLeadMutation.status === 'error' && (
                <p className="text-red-600">
                  Error: {(updateLeadMutation.error as Error)?.message || 'Unknown error'}
                </p>
              )}
            </div>
          ) : (
            <div>
              <h3 className="font-semibold">{lead.name}</h3>
              <p>Status: {lead.status}</p>
              {lead.avatarUrl && (
                <img
                  src={lead.avatarUrl}
                  alt={`${lead.name} avatar`}
                  className="w-16 h-16 rounded mt-2"
                />
              )}
              {lead.description && <p>{lead.description}</p>}
              {lead.activityLevel !== undefined && <p>Activity Level: {lead.activityLevel}</p>}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => startEdit(lead)}
                  className="text-blue-600 underline"
                  type="button"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(lead.id)}
                  className="text-red-600 underline"
                  type="button"
                  disabled={deleteLeadMutation.status === 'pending'}
                >
                  {deleteLeadMutation.status === 'pending' ? 'Deleting...' : 'Delete'}
                </button>
              </div>
              {deleteLeadMutation.status === 'error' && (
                <p className="text-red-600">
                  Error: {(deleteLeadMutation.error as Error)?.message || 'Unknown error'}
                </p>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
