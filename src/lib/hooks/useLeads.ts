import { useQuery } from '@tanstack/react-query'

interface Lead {
  id: number
  campaignId: number
  name: string
  status: string
  avatarUrl?: string
  description?: string
  activityLevel?: number
}

const fetchLeads = async (campaignId: number): Promise<Lead[]> => {
  const res = await fetch(`/api/campaigns/${campaignId}/leads`)
  if (!res.ok) throw new Error('Failed to fetch leads')
  return res.json() // Now returns an array directly
}

export const useLeads = (campaignId: number) => {
  return useQuery({
    queryKey: ['leads', campaignId],
    queryFn: () => fetchLeads(campaignId),
  })
}
