import { Context } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'

interface StateBathhous {
    userId: string
    date: string
    is_Active: boolean
}

export interface BathhousContext extends Context<Update> {
    state: StateBathhous
}
