import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'my-rds-instance.cq67n7vepxwz.ap-northeast-2.rds.amazonaws.com', //'host.docker.internal', //my-rds-instance.cq67n7vepxwz.ap-northeast-2.rds.amazonaws.com
  port: 3306, // 3307
  username: 'root',
  password: 'aslandev2023',
  database: 'AslanTest',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, //true값을 주면 애플리케이션을 다시 실행할 떄 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성해줍니다.
};
