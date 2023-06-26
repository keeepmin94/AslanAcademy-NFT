// // import { User } from '../entities/user.entity';
// // import { DataSource, Repository } from 'typeorm';
// // import { Injectable } from '@nestjs/common';

// import { DataSource, Repository } from 'typeorm';
// import { NftCombination } from '../entities/nftsCombination.entity';
// import { User } from '../entities/user.entity';

// export class NftsCombinationRepository extends Repository<NftCombination> {
//   //   constructor(dataSource: DataSource) {
//   //     super(NftCombination, dataSource.createEntityManager());
//   //   }

//   async checkOverlap(combination: string): Promise<NftCombination> {
//     return await this.findOne({ where: { combination: combination } });
//   }

//   async mint(combination: string, user: User): Promise<void> {
//     await this.save({ combination: combination, user: user });
//   }
// }
