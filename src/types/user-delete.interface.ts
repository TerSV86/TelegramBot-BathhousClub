import { Context } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'

export interface UserDeleteContext extends Context<Update> {
    state: {
        user: {
            id: string
            first_name: string
        }
    }
}
