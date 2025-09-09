import { useMutation, useQueryClient } from '@tanstack/react-query'

interface CreateCampaignInput {
  name: string
  status: string
  startDate: string
}

interface CreateCampaignResponse {
  campaign: {
    id: number
    name: string
    status: string
    startDate: string
  }
}

const createCampaign = async (data: CreateCampaignInput): Promise<CreateCampaignResponse> => {
  const res = await fetch('/api/campaigns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create campaign')
  return res.json()
}

export const useCreateCampaign = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
    },
  })
}
