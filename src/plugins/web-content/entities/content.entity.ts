import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { VendureEntity, DeepPartial } from '@vendure/core';

@Entity('content')
export class Content extends VendureEntity {
    constructor(input?: DeepPartial<Content>) {
        super(input);
    }

    @Column({ unique: true })
    code!: string; // Required field for Vendure custom entities

    @Column({ nullable: true })
    quotation?: string;

    @Column({ type: 'text', nullable: true })
    homeintroduction?: string;

    @Column('simple-array', { nullable: true })
    artistAchievements?: string[];

    @Column({ nullable: true })
    artistPhotoHome?: string;

    @Column({ type: 'int', nullable: true })
    age?: number;

    @Column({ nullable: true })
    nationality?: string;

    @Column({ type: 'text', nullable: true })
    aboutintroductionpara1?: string;

    @Column({ type: 'text', nullable: true })
    aboutintroductionpara2?: string;

    @Column({ nullable: true })
    artistPhotoAbout?: string;

    @Column({ nullable: true })
    instagram?: string;

    @Column({ nullable: true })
    twitter?: string;

    @Column({ nullable: true })
    whatsapp?: string;

    @Column('json', { nullable: true })
    achievements?: Achievement[];

    @Column('json', { nullable: true })
    exhibitions?: Exhibition[];

    @Column('json', { nullable: true })
    mediamentions?: Mediamentions[];
}

// Nested types
export interface Achievement {
    award: string;
    venue: string;
    year: number;
    photo:string;
}

export interface Exhibition {
    coverPhoto: string;
    title: string;
    venue: string;
    date: string;
}

export interface Mediamentions{
    photo:string;
    description:string;
    year:number;
    link:string;
}
