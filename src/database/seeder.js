"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const faker_1 = require("@faker-js/faker");
const model_1 = __importDefault(require("../entities/user/model"));
const model_2 = __importDefault(require("../entities/post/model"));
require("dotenv/config");
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
(0, db_1.dbConnection)();
const createSeedData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Eliminar datos existentes
        yield model_1.default.deleteMany({});
        yield model_2.default.deleteMany({});
        // Crear 20 usuarios
        const userPromises = Array.from({ length: 20 }, () => __awaiter(void 0, void 0, void 0, function* () {
            const user = new model_1.default({
                username: faker_1.faker.internet.userName(),
                email: faker_1.faker.internet.email(),
                password: bcrypt_1.default.hashSync("123456789", 12),
            });
            yield user.save();
            //crear un super_admin
            const superAdmin = new model_1.default({
                username: "superAdmin",
                email: "superadmin@superadmin.com",
                password: bcrypt_1.default.hashSync("123456789", 12),
                role: "super_admin",
            });
            yield superAdmin.save();
            // Para cada usuario, crear 10 posts
            const postPromises = Array.from({ length: 10 }, () => {
                const post = new model_2.default({
                    author: user._id,
                    content: faker_1.faker.lorem.paragraphs(),
                    publishedAt: faker_1.faker.date.past(),
                });
                return post.save();
            });
            yield Promise.all(postPromises); // Esperar a que todos los posts de este usuario se guarden
            return user;
        }));
        // Esperar a que todos los usuarios y sus posts sean creados
        yield Promise.all(userPromises);
        console.log("Seeder completado exitosamente");
    }
    catch (error) {
        console.error("Error al generar datos de prueba:", error);
    }
    finally {
        mongoose_1.default.disconnect();
    }
});
createSeedData();
