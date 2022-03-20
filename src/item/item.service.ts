import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  create(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemRepository.save(createItemDto);
  }

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  findOne(id: string): Promise<Item> {
    return this.itemRepository.findOne(id);
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    return this.itemRepository.update(id, updateItemDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.itemRepository.delete(id);
  }
}
