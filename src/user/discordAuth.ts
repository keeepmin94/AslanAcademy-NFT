import { Injectable, NotFoundException } from '@nestjs/common';
import { Client, GatewayIntentBits, Guild } from 'discord.js';

const botToken =
  'MTExMDYyODU3NzY2MzI3NTA2OA.GRcceG.eziMJRDp6uyxDgTjTundrslWgGJnAMXyLdHK80'; //MTA4NTE5MDIxODk2NzE3MTA5Mg.GdAMRY.IW3XcKE26ZSPLIgTTxT0pl-kGQGHOFjN0LmW64
const serverId = '1045385827607400478'; //1085192270883602543

@Injectable()
export class DiscordAuth {
  private client: Client;
  private server: Guild;

  constructor() {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
    this.loginClient();
  }
  async loginClient() {
    await this.client.login(botToken);
    console.log('로그인 함!');
    this.server = await this.client.guilds.fetch(serverId);
    console.log('서버 객체 생성');
  }

  async searchMember(discordName: string) {
    try {
      //const [nick, tag] = discordTag.split('#');
      // 특정 길드에서 이름이 포함된 멤버를 최대 limit명까지 검색
      const members = await this.server.members.search({
        query: discordName,
        limit: 5,
      });

      //console.log(members);

      // let isExist = false;
      // // //검색된 멤버의 정보 출력
      // let tmp;
      // members.forEach((member) => {
      //   if (tag === member.user.discriminator.toString()) {
      //     isExist = true;
      //     tmp = member;
      //     return false;
      //   }
      // });
      let isExist = false;
      let tmp;
      members.forEach((member) => {
        if (discordName === member.user.username) {
          isExist = true;
          tmp = member;
          return false;
        }
      });

      //유저 없을시 에러 처리
      if (!isExist) {
        throw new NotFoundException(`Can't not found User ${discordName}`);
      }

      return tmp;

      //디스코드 인증 시도 후  성공시 유저 정보 저장(지갑주소, 디스코드아이디(id?, 닉네임?) 등), 유저 정보 담긴 토큰 발급 (지갑 로그인 안되어있거나 디스코드 인증 실패시 에러 처리)
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
