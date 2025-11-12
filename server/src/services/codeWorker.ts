import { parentPort } from "worker_threads";

/**
 * Worker Thread que executa código JavaScript de forma isolada
 * Captura todo output e erros
 */

let originalLog = console.log;
let originalError = console.error;
let output = "";

// Redirecionar console.log e console.error
console.log = (...args: any[]) => {
  const message = args.map(arg => {
    if (typeof arg === "object") {
      return JSON.stringify(arg);
    }
    return String(arg);
  }).join(" ");
  
  output += message + "\n";
  originalLog(...args);
};

console.error = (...args: any[]) => {
  const message = args.map(arg => {
    if (typeof arg === "object") {
      return JSON.stringify(arg);
    }
    return String(arg);
  }).join(" ");
  
  output += message + "\n";
  originalError(...args);
};

// Receber código e executar
parentPort?.on("message", (message: { code: string }) => {
  try {
    output = "";

    // Criar função a partir do código
    // Usar Function constructor para executar o código em escopo isolado
    const func = new Function(message.code);

    // Executar função
    func();

    // Enviar output de volta
    parentPort?.postMessage(output);
  } catch (erro) {
    const errorMessage = erro instanceof Error ? erro.message : "Erro desconhecido";
    output += `\nERRO: ${errorMessage}`;
    parentPort?.postMessage(output);
  }
});
