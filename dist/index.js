"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    orm.getMigrator().up();
};
main().catch((err) => {
    console.error(err);
    return err;
});
//# sourceMappingURL=index.js.map