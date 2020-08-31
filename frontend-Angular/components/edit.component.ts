import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { BookService } from '../../book.service';
import { Book } from '../../book.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  book: any = {};
  updateForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      author: '',
      language: '',
      yearofpublication: ''
      
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.bookService.getBookById(this.id).subscribe(res => {
        this.book = res;
        this.updateForm.get('name').setValue(this.book.name);
        this.updateForm.get('author').setValue(this.book.author);
        this.updateForm.get('language').setValue(this.book.language);
        this.updateForm.get('yearofpublication').setValue(this.book.yearofpublication);
       
      });
    });
  }

  updateBook(name, author, language, yearofpublication) {
    this.bookService.updateBook(this.id, name, author, language, yearofpublication).subscribe(() => {
      this.snackBar.open('Book details updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
