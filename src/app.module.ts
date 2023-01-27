import { join } from 'path' // paquete integrado en node
import { ServeStaticModule } from '@nestjs/serve-static'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
