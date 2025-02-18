class CaracteristicaProduto {
  nome: string;
  descricao: string;
}

class ImagemProduto {
  url: string;
  descricao: string;
}

export class ProdutoEntity {
  id: string;
  usuarioId: string;
  nome: string;
  valor: number;
  quantidade: number;
  descricao: string;
  categoria: string;
  caracteristicas: CaracteristicaProduto[];
  imagens: ImagemProduto[];

  constructor(
    id?:              string,
    usuarioId?:       string,
    nome?:            string,
    valor?:           number,
    quantidade?:      number,
    descricao?:       string,
    categoria?:       string,
    caracteristicas?: CaracteristicaProduto[],
    imagens?:         ImagemProduto[]
  )
  
  constructor(
    id:               string,
    usuarioId:        string,
    nome:             string,
    valor:            number,
    quantidade:       number,
    descricao:        string,
    categoria:        string,
    caracteristicas:  CaracteristicaProduto[],
    imagens:          ImagemProduto[]
  ) {
    this.id               = id;
    this.usuarioId        = usuarioId;
    this.nome             = nome;
    this.valor            = valor;
    this.quantidade       = quantidade;
    this.descricao        = descricao;
    this.categoria        = categoria;
    this.caracteristicas  = caracteristicas;
    this.imagens          = imagens;
  }
}
