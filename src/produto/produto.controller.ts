import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoService } from './produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    return await this.produtoService.salvar(dadosProduto);
  }

  @Get()
  async listarTodos() {
    return await this.produtoService.listarTodos();
  }

  @Put('/:id')
  async atualizar(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    return await this.produtoService.atualizar(id, dadosProduto)
  }

  @Delete('/:id')
  async remover(@Param('id') id: string) {
    return await this.produtoService.remover(id)
  }
}
