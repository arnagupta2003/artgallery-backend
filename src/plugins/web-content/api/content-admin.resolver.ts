import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeletionResponse, Permission } from '@vendure/common/lib/generated-types';
import {
    Allow,
    Ctx,
    ID,
    ListQueryOptions,
    PaginatedList,
    RelationPaths,
    Relations,
    RequestContext,
    Transaction,
} from '@vendure/core';
import { Content } from '../entities/content.entity';
import { ContentService } from '../services/content.service';

// Full input type including new fields
interface CreateContentInput {
    code: string;
    quotation?: string;
    homeintroduction?: string;
    artistAchievements?: string[];
    artistPhotoHome?: string;
    age?: number;
    nationality?: string;
    aboutintroductionpara1?: string;
    aboutintroductionpara2?: string;
    artistPhotoAbout?: string;
    instagram?: string;
    twitter?: string;
    whatsapp?: string;
    achievements?: {
        award: string;
        venue: string;
        year: number;
        photo:string;
        link:string;
    }[];
    exhibitions?: {
        coverPhoto: string;
        title: string;
        venue: string;
        date: string;
        link:string;
    }[];
    mediamentions? : {
        photo:string;
        description:string;
        year:number;
        link:string;
    }[]
}

interface UpdateContentInput extends CreateContentInput {
    id: ID;
}

@Resolver()
export class ContentAdminResolver {
    constructor(private contentService: ContentService) {}

    @Query()
    @Allow(Permission.SuperAdmin)
    async content(
        @Ctx() ctx: RequestContext,
        @Args('id') id: ID,
        @Relations(Content) relations: RelationPaths<Content>,
    ): Promise<Content | null> {
        return this.contentService.findOne(ctx, id, relations);
    }

    @Query()
    @Allow(Permission.SuperAdmin)
    async contents(
        @Ctx() ctx: RequestContext,
        @Args('options', { nullable: true }) options: ListQueryOptions<Content>,
        @Relations(Content) relations: RelationPaths<Content>,
    ): Promise<PaginatedList<Content>> {
        return this.contentService.findAll(ctx, options || undefined, relations);
    }

    @Mutation()
    @Transaction()
    @Allow(Permission.SuperAdmin)
    async createContent(
        @Ctx() ctx: RequestContext,
        @Args('input') input: CreateContentInput,
    ): Promise<Content> {
        return this.contentService.create(ctx, input);
    }

    @Mutation()
    @Transaction()
    @Allow(Permission.SuperAdmin)
    async updateContent(
        @Ctx() ctx: RequestContext,
        @Args('input') input: UpdateContentInput,
    ): Promise<Content> {
        return this.contentService.update(ctx, input);
    }

    @Mutation()
    @Transaction()
    @Allow(Permission.SuperAdmin)
    async deleteContent(
        @Ctx() ctx: RequestContext,
        @Args('id') id: ID,
    ): Promise<DeletionResponse> {
        return this.contentService.delete(ctx, id);
    }
}
