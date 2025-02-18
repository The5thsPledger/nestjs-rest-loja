import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO }     from './dto/CriaUsuario.dto';
import { UsuarioService }     from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
     return this.usuarioService.salvar(dadosDoUsuario);
  }

  @Get()
  async listUsuarios() {
    return this.usuarioService.listar();
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    return this.usuarioService.atualiza(id, novosDados);
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}