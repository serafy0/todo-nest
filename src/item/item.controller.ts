import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('items')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findAll() {
    const items = await this.itemService.findAll();
    if (items === []) {
      throw new NotFoundException();
    }
    return items;
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const item = await this.itemService.findOne(id);
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    const item = await this.itemService.findOne(id);
    if (!item) {
      throw new NotFoundException();
    }
    await this.itemService.update(id, updateItemDto);

    const updatedItem = await this.itemService.findOne(id);
    return updatedItem;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const item = await this.itemService.findOne(id);
    if (!item) {
      throw new NotFoundException();
    }
    await this.itemService.remove(id);
  }
}
