import { Context } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'

interface User {
    id: string
    first_name: string
    username?: string
    is_bot?: boolean
    language_code?: string
}

interface StateUsers {
    users: [User]
}

export interface UserContext extends Context<Update> {
    state: StateUsers
}
