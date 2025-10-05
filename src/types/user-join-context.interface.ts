import { Context } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'

interface State {
    user?: string
}

export interface UserJoinContext extends Context<Update> {
    state: State
}
