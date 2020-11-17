import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm'
import { DbModule } from './db/db.module';

@Module({
  imports: [TypeOrmModule.forRoot(),HttpModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
