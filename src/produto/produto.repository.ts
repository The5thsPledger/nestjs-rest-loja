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

  listarTodos(
    categoria?: string, minValor?: number, maxValor?: number, page: number = 1, limite: number = 10
  ) {
    if (this.produtos.length == 0) {
      throw new NotFoundException("Nenhum produto foi criado");
    }
    else {
      const lista = this.produtos.sort().filter(
        (produto) => {
          if (categoria) {
            if (produto.categoria != categoria) {
              return false
            }
          }
          if (minValor) {
            if (produto.valor < minValor) {
              return false
            }
          }
          if (maxValor) {
            if (produto.valor > maxValor) {
              return false
            }
          }
          return true
        }
      )
      if (lista.length == 0) {
        throw new NotFoundException("Não foram encontrados produtos no filtro selecionado")
      }
      return lista.slice(limite*(page-1),limite*(page-1)+limite);
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
