import { Resolver, Query} from '@nestjs/graphql';
import { Ctx} from '@vendure/core';
import { Allow, RequestContext, Permission } from '@vendure/core';
import { ContentService } from '../services/content.service';
import { Content } from '../entities/content.entity';

@Resolver()
export class ContentShopResolver {
    constructor(private contentService: ContentService) {}

    @Query()
    async contents(@Ctx() ctx: RequestContext) {
        return this.contentService.findAll(ctx);
    }
}
