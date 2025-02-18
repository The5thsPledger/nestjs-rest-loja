import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private usuarioRepository: UsuarioRepository) {}

    async salvar(dadosDoUsuario: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.id = uuid();
    
        try {
            this.usuarioRepository.salvar(usuarioEntity);
            return {
                usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
                messagem: 'usuário criado com sucesso',
            };
        }
        catch(exception) {
            if (exception instanceof BadRequestException) {
                throw exception
            }
            return {
                mensagem: 'erro ao criar usuário: ' + exception.message
            }
        }
    }
    
    async listar() {
        try {
            return (await this.usuarioRepository.listar()).map(
                (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome)
            );
        }
        catch(exception) {
            if (exception instanceof BadRequestException) {
                throw exception
            }
                return {
                mensagem : 'erro ao resgatar usuários: ' + exception.message
            }
        }
    }

    async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
        try {
            return {
                usuario: await this.usuarioRepository.atualiza(id, dadosDeAtualizacao),
                messagem: 'usuário atualizado com sucesso',
            };
        }
        catch(exception) {
          if (exception instanceof NotFoundException) {
            throw exception
          }
          if (exception instanceof BadRequestException) {
            throw exception
          }
          return {
            mensagem: 'erro ao atualizar o usuário: ' + exception.message
          }
        }
    }

    async remove(id: string) {
        try {
            return {
                usuario: await this.usuarioRepository.remove(id),
                messagem: 'usuário removido com sucesso',
              };
        }
        catch(exception) {
            if (exception instanceof NotFoundException) {
            throw exception
            }
            if (exception instanceof BadRequestException) {
            throw exception
            }
            return {
            mensagem: 'erro ao deletar usuário: ' + exception.message
            }
        }
    }
}