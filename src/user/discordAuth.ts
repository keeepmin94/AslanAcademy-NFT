import { Injectable, NotFoundException } from '@nestjs/common';
import { Client, GatewayIntentBits, Guild } from 'discord.js';

@Injectable()
export class DiscordAuth {
  private client: Client;
  private server: Guild;

  constructor() {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
    this.loginClient();
  }
  async loginClient() {
    await this.client.login(process.env.DISCORD_BOT);
    console.log('클라이언트 로그인 성공');
    this.server = await this.client.guilds.fetch(process.env.DISCORD_SERVER);
  }

  async searchMember(discordName: string) {
    try {
      //const [nick, tag] = discordTag.split('#');
      // 특정 길드에서 이름이 포함된 멤버를 최대 limit명까지 검색
      const members = await this.server.members.search({
        query: discordName,
        limit: 1,
      });

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
