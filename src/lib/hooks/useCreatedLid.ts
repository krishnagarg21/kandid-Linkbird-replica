import { useMutation, useQueryClient } from '@tanstack/react-query'

interface CreateLeadInput {
  campaignId: number
  name: string
  status: string
  avatarUrl?: string
  description?: string
  activityLevel?: number
}

interface CreateLeadResponse {
  lead: {
    id: number
    campaignId: number
    name: string
    status: string
    avatarUrl?: string
    description?: string
    activityLevel?: number
  }
}

const createLead = async (data: CreateLeadInput): Promise<CreateLeadResponse> => {
  const res = await fetch(`/api/campaigns/${data.campaignId}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create lead')
  return res.json()
}

export const useCreateLead = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
    },
  })
}
