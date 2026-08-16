import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchQueryDto } from "./dto/search-query.dto";

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  @HttpCode(200)
  async handleSearch(@Body() dto: SearchQueryDto) {
    return this.searchService.search(dto.origin, dto.destination, dto.date);
  }
}
