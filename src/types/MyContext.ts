import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { Context as TelegrafContext } from 'telegraf'
export interface MyContext extends TelegrafContext {
    state: {
        createUserDto?: CreateUserDto | CreateUserDto[]
    }
}
