import { 
  Controller, Get, Post, Body, Delete, Param, 
  UseInterceptors, UploadedFile 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/contacts',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `contact-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  create(@UploadedFile() file: Express.Multer.File, @Body() dto: any) {
    return this.contactsService.create({
      ...dto,
      image: file ? `/uploads/contacts/${file.filename}` : null,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}