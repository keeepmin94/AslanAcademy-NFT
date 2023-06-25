import { UserDonate } from '../entities/userDonate.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserDonateRepository extends Repository<UserDonate> {
  constructor(dataSource: DataSource) {
    super(UserDonate, dataSource.createEntityManager());
  }

  async checkDonate(user: User): Promise<UserDonate[]> {
    const userDonates = await this.find({ where: { user: { id: user.id } } });
    return userDonates;
  }

  async donate(donationAmount: number, user: User): Promise<void> {
    await this.save({ donationAmount, user });
  }
}
