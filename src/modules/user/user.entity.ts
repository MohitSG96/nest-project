import { Column, DataType, Model, Table } from 'sequelize-typescript';

/**
 * User's Table Entity Definition
 */
@Table
export class User extends Model<User> {
  /**
   * User's full name
   */
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  /**
   * User's email ID (unique in DB)
   */
  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  /**
   * User's encrypted password
   */
  @Column({
    allowNull: false,
    type: DataType.TEXT('medium'),
  })
  cryptPass: string;

  /**
   * User's phone number (unique in DB)
   */
  @Column({ unique: true, type: DataType.STRING, allowNull: false })
  phone: string;

  /**
   * User is active or not (default active)
   */
  @Column({ defaultValue: true })
  isActive: boolean;
}
