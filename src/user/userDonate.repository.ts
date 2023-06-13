import { UserDonate } from './userDonate.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserDonateRepository extends Repository<UserDonate> {
  constructor(dataSource: DataSource) {
    super(UserDonate, dataSource.createEntityManager());
  }

  // async checkDonate(user: User): Promise<boolean> {
  //   const userDonates = await this.find({ where: { user } });
  //   return userDonates.length > 0;
  // }

  async donate(donationAmount: number, user: User): Promise<void> {
    await this.save({ donationAmount, user });
  }
}
