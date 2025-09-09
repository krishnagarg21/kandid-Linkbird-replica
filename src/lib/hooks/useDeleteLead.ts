import { useMutation, useQueryClient } from '@tanstack/react-query'


interface DeleteLeadInput {
  id: number
  campaignId: number
}

const deleteLead = async ({ id, campaignId }: DeleteLeadInput) => {
  const res = await fetch(`/api/campaigns/${campaignId}/leads/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete lead')
  return res.json()
}


export const useDeleteLead = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteLead,  // now accepts a single object
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['leads'] }),
  })
}