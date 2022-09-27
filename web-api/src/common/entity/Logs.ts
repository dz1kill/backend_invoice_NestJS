import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'first_name',
    nullable: true,
  })
  firstName: string;

  @Column({
    nullable: true,
    name: 'last_name',
  })
  lastName: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: true,
  })
  company: string;

  @Column()
  successfully: boolean;

  @Column({
    nullable: true,
    name: 'summ_cost',
  })
  summCost: number;

  @Column('uuid', { nullable: true, name: 'invoice_id', unique: true })
  invoiceId: string;

  @Column('timestamp with time zone', {
    nullable: false,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
