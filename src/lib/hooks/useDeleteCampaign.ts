import { useMutation, useQueryClient } from '@tanstack/react-query'

const deleteCampaign = async (id: number) => {
  const res = await fetch(`/api/campaigns/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete campaign')
  return res.json()
}

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
    },
  })
}