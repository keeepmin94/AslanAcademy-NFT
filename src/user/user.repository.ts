import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findUser(walletAddress: string): Promise<User> {
    return await this.findOne({ where: { walletAddress: walletAddress } });
  }

  async findOrCreateUser(
    discordId: string,
    walletAddress: string,
    discordTag: string,
  ): Promise<User> {
    let user = await this.findOne({ where: { discordId: discordId } });

    if (!user) {
      console.log('없어요!');
      user = this.create({ discordId, walletAddress, discordTag });
      await this.save(user);
    } else console.log('있어요!');

    return user;
  }

  // async checkOverlap(combination: string): Promise<boolean> {

  // }
}
