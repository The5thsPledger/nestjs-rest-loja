import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';
import { UsuarioService } from './usuario.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, EmailEhUnicoValidator, UsuarioRepository],
})
export class UsuarioModule {}