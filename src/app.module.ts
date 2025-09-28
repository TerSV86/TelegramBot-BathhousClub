import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TelegrafModule } from 'nestjs-telegraf'
import * as LocalSession from 'telegraf-session-local'
import { BotActionsService } from './bot/bot.update'
import { BotActionsUpdate } from './bot/bot-actions.update'
import { BotUpdate } from './bot/bot-actions.service'
import { ScheduleModule } from '@nestjs/schedule'
import { TasksService } from './tasks/tasks.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { AddIsActiveMiddleware } from './middleware/addIsActiveMiddleware.middleware'

const sessions = new LocalSession({ database: 'session_db.json' })

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), // для доступа к .env во всем  приложении
        TelegrafModule.forRootAsync({
            // подключаем телеграф
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const addIsActive = new AddIsActiveMiddleware()
                return {
                    token: configService.get<string>('TOKEN'),
                    middlewares: [
                        sessions.middleware(),
                        addIsActive.getMiddleware(),
                    ],
                }
            },
        }),
        ScheduleModule.forRoot(), // подключаем cron для создания tasks
        TypeOrmModule.forRootAsync({
            // подключаем TypeORM
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: parseInt(configService.get<string>('DB_PORT'), 10),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                synchronize: true,
                schema: 'bathhouse',
                entities: [__dirname + '/**/*.entity{.js,.ts}'],
            }),
        }),
        UsersModule,
    ],
    providers: [
        BotActionsService,
        BotActionsUpdate,
        BotUpdate,
        TasksService,
        AddIsActiveMiddleware,
    ],
})
export class AppModule {}
