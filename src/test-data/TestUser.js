//Класс — это шаблон для объектов, у которых есть данные и "умения".
const HIGH_ROLLER_THRESHOLD = 10000;

export class TestUser {
    constructor(user) {
        // constructor(user) запускается один раз, когда пишешь new TestUser(buildUser()).
        // Внутри через this сохраняют данные: this.username = user.username и так далее.

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
