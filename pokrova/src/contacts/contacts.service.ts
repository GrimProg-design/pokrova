import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from './contacts.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(ContactEntity)
    private repo: Repository<ContactEntity>,
  ) {}

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  create(dto: any) {
    const contact = this.repo.create(dto);
    return this.repo.save(contact);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}