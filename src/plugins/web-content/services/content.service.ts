import { Inject, Injectable } from '@nestjs/common';
import { DeletionResponse, DeletionResult } from '@vendure/common/lib/generated-types';
import { ID, PaginatedList } from '@vendure/common/lib/shared-types';
import {
    ListQueryBuilder,
    ListQueryOptions,
    RelationPaths,
    RequestContext,
    TransactionalConnection,
    assertFound,
    patchEntity
} from '@vendure/core';
import { WEB_CONTENT_PLUGIN_OPTIONS } from '../constants';
import { Content } from '../entities/content.entity';
import { PluginInitOptions } from '../types';

// These can be replaced by generated types if you set up code generation
interface CreateContentInput {
    code: string;
    // Define the input fields here
}
interface UpdateContentInput {
    id: ID;
    code?: string;
    // Define the input fields here
}

@Injectable()
export class ContentService {
    constructor(
        private connection: TransactionalConnection,
        private listQueryBuilder: ListQueryBuilder, @Inject(WEB_CONTENT_PLUGIN_OPTIONS) private options: PluginInitOptions
    ) {}

    findAll(
        ctx: RequestContext,
        options?: ListQueryOptions<Content>,
        relations?: RelationPaths<Content>,
    ): Promise<PaginatedList<Content>> {
        return this.listQueryBuilder
            .build(Content, options, {
                relations,
                ctx,
            }
            ).getManyAndCount().then(([items, totalItems]) => {
                return {
                    items,
                    totalItems,
                }
            }
            );
    }

    findOne(
        ctx: RequestContext,
        id: ID,
        relations?: RelationPaths<Content>,
    ): Promise<Content | null> {
        return this.connection
            .getRepository(ctx, Content)
            .findOne({
                where: { id },
                relations,
            });
    }

    async create(ctx: RequestContext, input: CreateContentInput): Promise<Content> {
        const newEntity = await this.connection.getRepository(ctx, Content).save(input);
        return assertFound(this.findOne(ctx, newEntity.id));
    }

    async update(ctx: RequestContext, input: UpdateContentInput): Promise<Content> {
        const entity = await this.connection.getEntityOrThrow(ctx, Content, input.id);
        const updatedEntity = patchEntity(entity, input);
        await this.connection.getRepository(ctx, Content).save(updatedEntity, { reload: false });
        return assertFound(this.findOne(ctx, updatedEntity.id));
    }

    async delete(ctx: RequestContext, id: ID): Promise<DeletionResponse> {
        const entity = await this.connection.getEntityOrThrow(ctx, Content, id);
        try {
            await this.connection.getRepository(ctx, Content).remove(entity);
            return {
                result: DeletionResult.DELETED,
            };
        } catch (e: any) {
            return {
                result: DeletionResult.NOT_DELETED,
                message: e.toString(),
            };
        }
    }
}
