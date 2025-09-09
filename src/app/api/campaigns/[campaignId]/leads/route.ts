// import { NextResponse } from 'next/server'
// import { db } from '../../../../../lib/db'
// import { leads } from '../../../../../lib/schema'
// import { eq } from 'drizzle-orm'

// interface Params {
//   params: { campaignId: string }
// }

// export async function GET(request: Request, { params }: Params) {
//   const campaignId = Number(params.campaignId)
//   try {
//     const campaignLeads = await db
//       .select()
//       .from(leads)
//       .where(eq(leads.campaignId, campaignId))

//     // Return the leads array directly
//     return NextResponse.json(campaignLeads)
//   } catch (error) {
//     return NextResponse.json({ success: false, message: (error as Error).message })
//   }
// }

// export async function POST(request: Request, { params }: Params) {
//   try {
//     const campaignId = Number(params.campaignId)
//     const body = await request.json()
//     const { name, status, avatarUrl, description, activityLevel } = body

//     const newLead = await db
//       .insert(leads)
//       .values({
//         campaignId,
//         name,
//         status,
//         avatarUrl,
//         description,
//         activityLevel,
//       })
//       .returning()

//     return NextResponse.json({ success: true, lead: newLead[0] })
//   } catch (error) {
//     return NextResponse.json({ success: false, message: (error as Error).message })
//   }
// }


import { NextResponse, NextRequest } from "next/server"
import { db } from "../../../../../lib/db"
import { leads } from "../../../../../lib/schema"
import { eq } from "drizzle-orm"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ campaignId: string }> }
) {
  const { campaignId } = await context.params
  try {
    const campaignLeads = await db
      .select()
      .from(leads)
      .where(eq(leads.campaignId, Number(campaignId)))

    return NextResponse.json(campaignLeads)
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ campaignId: string }> }
) {
  try {
    const { campaignId } = await context.params
    const body = await request.json()
    const { name, status, avatarUrl, description, activityLevel } = body

    const newLead = await db
      .insert(leads)
      .values({
        campaignId: Number(campaignId),
        name,
        status,
        avatarUrl,
        description,
        activityLevel,
      })
      .returning()

    return NextResponse.json({ success: true, lead: newLead[0] })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    )
  }
}
