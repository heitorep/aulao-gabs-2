import { Motor, Carro, Fila, Pilha } from './prova';

describe('Testes de unidade para a classe Motor', () => {
    let motor: Motor;

    beforeEach(() => {
        motor = new Motor();
    });

    it('deve ligar o motor corretamente', () => {
        expect(motor.ligar()).toBe("Motor ligado");
        expect(motor['ligado']).toBe(true);
    });

    it('deve desligar o motor corretamente', () => {
        expect(motor.desligar()).toBe("Motor desligado");
        expect(motor['ligado']).toBe(false);
    });
});

describe('Testes de unidade para a classe Carro', () => {
    let carro: Carro;

    beforeEach(() => {
        carro = new Carro();
    });

    it('deve retornar erro ao acelerar com motor desligado', async () => {
        await expect(carro.acelerar()).resolves.toBe("Erro ao acelerar: motor desligado");
    });

    it('deve acelerar corretamente com motor ligado', async () => {
        carro['motor'].ligar();
        await expect(carro.acelerar()).resolves.toBe("Acelerando...");
    });
});

describe('Testes de integração entre as classes Carro e Motor', () => {
    let carro: Carro;

    beforeEach(() => {
        carro = new Carro();
    });

    it('deve retornar erro ao acelerar com motor desligado', async () => {
        await expect(carro.acelerar()).resolves.toBe("Erro ao acelerar: motor desligado");
    });

    it('deve acelerar corretamente com motor ligado', async () => {
        carro['motor'].ligar();
        await expect(carro.acelerar()).resolves.toBe("Acelerando...");
    });

    it('deve desligar o motor corretamente', () => {
        expect(carro['motor'].desligar()).toBe("Motor desligado");
    });
});

describe('Testes adicionais de integração entre as classes Carro e Motor', () => {
    let carro: Carro;

    beforeEach(() => {
        carro = new Carro();
    });

    it('deve acelerar corretamente após ligar o motor', async () => {
        carro['motor'].ligar();
        await expect(carro.acelerar()).resolves.toBe("Acelerando...");
    });

    it('deve parar de acelerar após desligar o motor', async () => {
        carro['motor'].ligar();
        await carro.acelerar();
        expect(carro['motor'].desligar()).toBe("Motor desligado");
        await expect(carro.acelerar()).resolves.toBe("Erro ao acelerar: motor desligado");
    });

    it('deve continuar funcionando após várias operações de ligar e desligar o motor', async () => {
        carro['motor'].ligar();
        await expect(carro.acelerar()).resolves.toBe("Acelerando...");
        expect(carro['motor'].desligar()).toBe("Motor desligado");
        await expect(carro.acelerar()).resolves.toBe("Erro ao acelerar: motor desligado");
        carro['motor'].ligar();
        await expect(carro.acelerar()).resolves.toBe("Acelerando...");
    });
});

describe('Testes de unidade adicionais para a classe Motor', () => {
    let motor: Motor;

    beforeEach(() => {
        motor = new Motor();
    });

    it('deve registrar corretamente a operação de ligar na pilha de histórico', () => {
        motor.ligar();
        expect(motor.obterUltimaOperacao()).toBe("ligar");
    });

    it('deve registrar corretamente a operação de desligar na pilha de histórico', () => {
        motor.ligar();
        motor.desligar();
        expect(motor.obterUltimaOperacao()).toBe("desligar");
    });

    it('deve retornar undefined se não houver operações no histórico', () => {
        expect(motor.obterUltimaOperacao()).toBeUndefined();
    });
});

describe('Testes de unidade adicionais para a classe Carro', () => {
    let carro: Carro;

    beforeEach(() => {
        carro = new Carro();
    });

    it('deve registrar corretamente a operação de acelerar na fila de operações de aceleração', async () => {
        carro['motor'].ligar();
        await carro.acelerar();
        expect(carro.obterUltimaOperacaoAceleracao()).toBe("acelerar");
    });

    it('não deve registrar a operação de acelerar se o motor estiver desligado', async () => {
        await carro.acelerar();
        expect(carro.obterUltimaOperacaoAceleracao()).toBeUndefined();
    });

    it('deve retornar undefined se não houver operações na fila de operações de aceleração', () => {
        expect(carro.obterUltimaOperacaoAceleracao()).toBeUndefined();
    });
});

