import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';

/**
 * User's Table Entity Definition
 */
@Table
export class Task extends Model<Task> {
  /**
   * User's task title
   */
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  title: string;

  /**
   * Task's description (optional)
   */
  @Column({
    type: DataType.TEXT('medium'),
  })
  description: string;

  /**
   * Task is completed or pending
   */
  @Column({ defaultValue: true })
  isCompleted: boolean;

  /**
   * UserId for task
   */
  @Column({ allowNull: false, type: DataType.INTEGER.UNSIGNED })
  @ForeignKey(() => User)
  UserId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user: User;
}
