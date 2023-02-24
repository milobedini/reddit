"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
const main = async () => {
    const orm = await core_1.MikroORM.init({
        entities: [Post_1.Post],
        dbName: "reddit",
        user: "postgres",
        password: "Thelionshar3",
        type: "postgresql",
        debug: !constants_1.__prod__,
    });
    const post = orm.em.create(Post_1.Post, {
        title: "my first post",
    });
    console.log("sql");
    await orm.em.persistAndFlush(post);
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map