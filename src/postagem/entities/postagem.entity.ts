import { IsNotEmpty, MaxLength} from "class-validator";
import { Tema } from "src/tema/entities/tema.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity({name: "tb_postagens"})
    export class Postagem{

        @PrimaryGeneratedColumn()
        id: number

        @IsNotEmpty()
        @MaxLength(100)
        @Column({length: 100, nullable: false})
        nome: string

        @IsNotEmpty()
        @Column({length: 1000, nullable: false})
        sobreEu: string

        @UpdateDateColumn()
        dataNascimento: Date

        @ManyToOne(() => Tema, (tema) => tema.postagem, {
            onDelete: "CASCADE"
        })
        tema: Tema
    }