import { Injectable } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { randomUUID } from "crypto";
import { AtualizaProdutoDTO } from "./dto/atualizaProduto.dto";

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
        
        return this.produtoRepository.salvar(produto);
    }
    
    async listarTodos() {
        return this.produtoRepository.listarTodos();
    }

    async atualizar(id: string, dadosProduto: AtualizaProdutoDTO) {
        const produtoAlterado = await this.produtoRepository.atualizar(
              id,
              dadosProduto,
          );
      
        return {
          mensagem: 'produto atualizado com sucesso',
          produto: produtoAlterado,
        };
    }

    async remover(id: string) {
        const produtoRemovido = await this.produtoRepository.remover(id);

        return {
            mensagem: 'produto removido com sucesso',
            produto: produtoRemovido,
        };
    }
}