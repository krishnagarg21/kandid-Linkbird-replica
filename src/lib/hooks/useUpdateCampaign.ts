import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateCampaignInput {
  id: number
  name: string
  status: string
  startDate: string
}

const updateCampaign = async (data: UpdateCampaignInput) => {
  const res = await fetch(`/api/campaigns/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update campaign')
  return res.json()
}

export const useUpdateCampaign = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
    },
  })
}
