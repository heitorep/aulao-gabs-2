// Importa as bibliotecas 'axios' e 'http'
import axios from 'axios';
import * as http from 'http';

// Criação de um servidor HTTP simples
const server = http.createServer((req, res) => {
    // Configura o cabeçalho da resposta com o status 200 e o tipo de conteúdo como texto plano
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // Escreve na resposta "Servidor em execução..."
    res.end('Servidor em execução...');
});

// Define a porta na qual o servidor irá escutar
const PORT = 1234;

// Inicia o servidor na porta definida
server.listen(PORT, () => {
    console.log(`Servidor em execução em http://localhost:${PORT}`);
});

// Define a URL do endpoint
const endpoint_url = `http://localhost:${PORT}/engine/start`;

// Define a classe Fila
export class Fila {
    // Declaração dos atributos privados
    private elementos: any[];

    // Construtor da classe
    constructor() {
        // Inicializa o array de elementos vazio
        this.elementos = [];
    }

    // Método para enfileirar um elemento na fila
    enfileirar(elemento: any): void {
        // Adiciona o elemento ao final da fila
        this.elementos.push(elemento);
    }

    // Método para desenfileirar um elemento da fila
    desenfileirar(): any | undefined {
        // Remove e retorna o primeiro elemento da fila
        return this.elementos.shift();
    }

    // Método para obter o tamanho da fila
    tamanho(): number {
        // Retorna o tamanho da fila (quantidade de elementos)
        return this.elementos.length;
    }

    // Método para verificar se a fila está vazia
    estaVazia(): boolean {
        // Retorna verdadeiro se a fila estiver vazia, falso caso contrário
        return this.elementos.length === 0;
    }
}

// Define a classe Pilha
export class Pilha {
    // Declaração dos atributos privados
    private elementos: any[];

    // Construtor da classe
    constructor() {
        // Inicializa o array de elementos vazio
        this.elementos = [];
    }

    // Método para empilhar um elemento na pilha
    empilhar(elemento: any): void {
        // Adiciona o elemento ao topo da pilha
        this.elementos.push(elemento);
    }

    // Método para desempilhar um elemento da pilha
    desempilhar(): any | undefined {
        // Remove e retorna o último elemento da pilha
        return this.elementos.pop();
    }

    // Método para obter o tamanho da pilha
    tamanho(): number {
        // Retorna o tamanho da pilha (quantidade de elementos)
        return this.elementos.length;
    }

    // Método para verificar se a pilha está vazia
    estaVazia(): boolean {
        // Retorna verdadeiro se a pilha estiver vazia, falso caso contrário
        return this.elementos.length === 0;
    }
}

// Define a classe Motor
export class Motor {
    // Declaração dos atributos privados
    private ligado: boolean;
    private historicoOperacoes: Pilha;

    // Construtor da classe
    constructor() {
        // Inicializa o motor desligado e cria uma pilha para registrar as operações
        this.ligado = false;
        this.historicoOperacoes = new Pilha();
    }

    // Método para ligar o motor
    ligar(): string {
        // Altera o status do motor para ligado
        this.ligado = true;
        // Registra a operação na pilha de histórico
        this.historicoOperacoes.empilhar("ligar");
        // Retorna uma mensagem indicando que o motor foi ligado
        return "Motor ligado";
    }

    // Método para desligar o motor
    desligar(): string {
        // Altera o status do motor para desligado
        this.ligado = false;
        // Registra a operação na pilha de histórico
        this.historicoOperacoes.empilhar("desligar");
        // Retorna uma mensagem indicando que o motor foi desligado
        return "Motor desligado";
    }

    // Método para obter a última operação realizada no motor
    obterUltimaOperacao(): string | undefined {
        // Desempilha e retorna a última operação registrada na pilha de histórico
        return this.historicoOperacoes.desempilhar();
    }
}

// Define a classe Carro
export class Carro {
    // Declaração dos atributos privados
    private motor: Motor;
    private operacoesAceleracao: Fila;

    // Construtor da classe
    constructor() {
        // Inicializa o motor e a fila de operações de aceleração
        this.motor = new Motor();
        this.operacoesAceleracao = new Fila();
    }

    // Método assíncrono para acelerar o carro
    async acelerar(): Promise<string> {
        // Verifica se o motor está ligado
        if (this.motor['ligado']) {
            // Se o motor estiver ligado, enfileira a operação de acelerar
            this.operacoesAceleracao.enfileirar("acelerar");
            // Retorna uma mensagem indicando que o carro está acelerando
            return "Acelerando...";
        } else {
            // Se o motor estiver desligado, retorna uma mensagem de erro
            return "Erro ao acelerar: motor desligado";
        }
    }

    // Método para obter a última operação de aceleração realizada no carro
    obterUltimaOperacaoAceleracao(): string | undefined {  
        // Desenfileira e retorna a última operação de aceleração registrada na fila
        return this.operacoesAceleracao.desenfileirar();
    }
}

// Encerra o servidor após a execução dos testes
afterAll(() => {
    server.close();
});
