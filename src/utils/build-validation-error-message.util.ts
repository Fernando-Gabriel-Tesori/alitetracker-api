import type { ZodIssue } from "zod";

/**
 * Constrói uma lista de mensagens de erro a partir dos problemas de validação do Zod.
 *
 * @param issues - Lista de erros retornados por um schema do Zod.
 * @returns Lista de mensagens formatadas com o caminho e a mensagem de erro.
 */
export function buildValidationErrorMessage(issues: ZodIssue[]): string[] {
  return issues.map((issue) => {
    const path = issue.path.join(".");
    return `${path}: ${issue.message}`;
  });
}
