import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.TEXT('medium'),
  })
  cryptPass: string;

  @Column({ unique: true, type: DataType.STRING })
  phone: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
