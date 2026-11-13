import type { User } from './buildUser.js';

const HIGH_ROLLER_THRESHOLD = 10000;

export class TestUser {
    username: string;
    email: string;
    password: string;
    currency: string;
    country: string;
    balance: number;

    constructor(user: User) {
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.currency = user.currency;
        this.country = user.country;
        this.balance = user.balance ?? 0;
    }

    get displayName() {
        // get displayName() — геттер. Его вызывают без скобок, как обычное свойство: user.displayName.
        // Он не хранит значение, а считает его каждый раз при обращении.
        return `${this.username} <${this.email}>`;
    }

    get isHighRoller() {
        // вернуть true или false
        return this.balance >= HIGH_ROLLER_THRESHOLD;
    }
}
