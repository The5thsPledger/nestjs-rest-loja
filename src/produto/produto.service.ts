import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { randomUUID } from "crypto";
import { AtualizaProdutoDTO } from "./dto/atualizaProduto.dto";
import { error } from "console";
import { isInstance } from "class-validator";

@Injectable()
export class ProdutoService {
    constructor(private produtoRepository: ProdutoRepository) {}

    async salvar(dadosProduto: CriaProdutoDTO) {
        const produto = new ProdutoEntity(
            randomUUID(),
            dadosProduto.nome,
            dadosProduto.usuarioId,
            dadosProduto.valor,
            dadosProduto.quantidade,
            dadosProduto.descricao,
            dadosProduto.categoria,
            dadosProduto.caracteristicas,
            dadosProduto.imagens
        )
        try {
            return this.produtoRepository.salvar(produto);
        }
        catch (exception) {
            if (exception instanceof BadRequestException) {
                throw exception;
            }
            return {
                mensagem: "Erro inesperado ao criar produto: " + exception.message
            }
        }
    }
    
    async listarTodos(
        categoria?: string, minValor?: number, maxValor?: number, page: number = 1, limite: number = 10
    ) {
        try {
            const lista = this.produtoRepository.listarTodos(categoria, minValor, maxValor, page, limite);
            if (lista.length > 0) {
                return lista
            }
            else {
                throw new NotFoundException(
                    "A página solicitada não possui produtos no filtro selecionado. " + 
                    "Escolha uma página menor para receber os resultados da busca"
                )
            }
        }
        catch (exception) {
            if (exception instanceof BadRequestException) {
                throw exception;
            }
            if (exception instanceof NotFoundException) {
                throw exception;
            }
            return {
                mensagem: "Erro inesperado ao listar produtos: " + exception.message
            }
        }
    }

    async atualizar(id: string, dadosProduto: AtualizaProdutoDTO) {
        try {
            const produtoAlterado = await this.produtoRepository.atualizar(
                id,
                dadosProduto,
            );
            
            return {
                mensagem: 'Produto atualizado com sucesso',
                produto: produtoAlterado,
            };
        }
        catch (exception) {
            if (exception instanceof BadRequestException) {
                throw exception
            }
            if (exception instanceof NotFoundException) {
                throw exception
            }
            return {
                mensagem: "Erro inesperado ao atualizar produto: " + exception.message
            }
        }
    }

    async remover(id: string) {
        try {
            const produtoRemovido = await this.produtoRepository.remover(id);

            return {
                mensagem: 'Produto removido com sucesso',
                produto: produtoRemovido,
            };
        }
        catch (exception) {
            if (exception instanceof BadRequestException) {
                throw exception
            }
            if (exception instanceof NotFoundException) {
                throw exception
            }
            return {
                mensagem: "Erro inesperado ao remover produto: " + exception.message
            }
        }
    }
}