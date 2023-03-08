import { Migration } from '@mikro-orm/migrations';

export class Migration20230308153636 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz not null default null, "updated_at" timestamptz not null default null, "username" text not null default null, "password" text not null default null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }

}
