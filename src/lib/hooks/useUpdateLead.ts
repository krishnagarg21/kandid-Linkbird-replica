import { useMutation, useQueryClient } from '@tanstack/react-query'

// Update Lead
const updateLead = async (data: {
  id: number
  campaignId: number  
  name: string
  status: string
  avatarUrl?: string
  description?: string
  activityLevel?: number
}) => {
  const res = await fetch(`/api/campaigns/${data.campaignId}/leads/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update lead')
  return res.json()
}

export const useUpdateLead = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateLead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['leads'] }),
  })
}