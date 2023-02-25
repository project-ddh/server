import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonEntity {
  /**
   * 해당 열이 추가된 시각을 자동으로 기록
   * 만일 Postgres의 time zone이 'UTC'라면 UTC 기준으로 출력하고 'Asia/Seoul'라면 서울 기준으로 출력한다.
   * DB SQL QUERY : set time zone 'Asia/Seoul'; set time zone 'UTC'; show timezone;
   */
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deletedAt: Date;
}
