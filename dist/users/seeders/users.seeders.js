"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("../entities/users.entity");
const bcrypt = require("bcrypt");
const user_role_enum_1 = require("../entities/user-role.enum");
let UsersSeeder = class UsersSeeder {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async seedAdminUser() {
        const adminExists = await this.userRepository.findOne({ where: { email: 'admin@jktech.com' } });
        if (!adminExists) {
            const adminUser = this.userRepository.create({
                email: 'admin@jktech.com',
                password: await bcrypt.hash('admin123', 10),
                role: user_role_enum_1.UserRole.ADMIN,
            });
            await this.userRepository.save(adminUser);
            console.log('Admin user seeded successfully!');
        }
    }
};
exports.UsersSeeder = UsersSeeder;
exports.UsersSeeder = UsersSeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersSeeder);
//# sourceMappingURL=users.seeders.js.map