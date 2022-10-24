import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private PostagemRepository: Repository<Postagem>
    ) {}

    async findAll(): Promise<Postagem[]> {
        return await this.PostagemRepository.find({
            relations: {
                tema: true
            }
        })
        
    }

    async findById(id: number): Promise<Postagem> {

        let postagem = await this.PostagemRepository.findOne({
            where: {
                id
            },
            relations: {
                tema: true
            }
        })

        if (!Postagem)
        throw new HttpException('Postagem não existe', HttpStatus.NOT_FOUND)

        return postagem
    }

    async findByNome(nome: string): Promise<Postagem[]> {
        return await this.PostagemRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                tema: true
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.PostagemRepository.save(postagem)
    }

    async update(postagem: Postagem): Promise<Postagem> {
        let buscarPostagem = await this.findById(postagem.id)

        if(!buscarPostagem || !postagem.id)
            throw new HttpException(`Postagem não Existe`, HttpStatus.NOT_FOUND)

            return await this.PostagemRepository.save(postagem)
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscarPostagem = await this.findById(id)

        if(!buscarPostagem)
            throw new HttpException(`Postagem nçao encontrada`, HttpStatus.NOT_FOUND)

        return await this.PostagemRepository.delete(id)
    }
}