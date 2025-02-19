import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  async listarTodos(
    @Query('categoria') categoria?: string,
    @Query('minValor')  minValor? : string,
    @Query('maxValor')  maxValor? : string,
    @Query('page')      page?     : string,
    @Query('limite')    limite?   : string
  ) {
    try {
      let minValorNumber : number = minValor? parseFloat(minValor) : null
      if(isNaN(minValorNumber)) {
        minValorNumber = null;
      }
      
      let maxValorNumber : number = maxValor? parseFloat(maxValor) : null
      if(isNaN(maxValorNumber)) {
        maxValorNumber = null;
      }
      
      let pageNumber : number = page? parseInt(page) : 1
      if(isNaN(pageNumber)) {
        pageNumber = 1;
      }
      
      let limiteNumber : number = limite? parseInt(limite) : 10
      if(isNaN(limiteNumber)) {
        limiteNumber = 10;
      }
      
      return await this.produtoService.listarTodos(
        categoria, minValorNumber, maxValorNumber, pageNumber, limiteNumber
      );
    }
    catch (exception) {
      throw exception
    }
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
