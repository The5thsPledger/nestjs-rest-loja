import { Injectable, NotFoundException } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';
import { error } from 'console';

@Injectable()
export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  salvar(dadosProduto: ProdutoEntity) {
    this.produtos.push(dadosProduto);
    return dadosProduto;
  }

  listarTodos() {
    if (this.produtos.length > 0) {
      return this.produtos;
    }
    else {
      throw new NotFoundException("Nenhum produto criado");
    }
  }

  private buscaPorId(id: string) {
    const possivelProduto = this.produtos.find((produto) => produto.id === id);

    if (!possivelProduto) {
      throw new NotFoundException('Produto não existe');
    }

    return possivelProduto;
  }

  async atualizar(id: string, dadosProduto: Partial<ProdutoEntity>) {
    const dadosNaoAtualizaveis = ['id', 'usuarioId'];
    const produto = this.buscaPorId(id);
    Object.entries(dadosProduto).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return;
      }
      produto[chave] = valor;
    });

    return produto;
  }

  async remover(id: string) {
    const produtoRemovido = this.buscaPorId(id);
    this.produtos = this.produtos.filter((produto) => produto.id !== id);
    return produtoRemovido;
  }
}
