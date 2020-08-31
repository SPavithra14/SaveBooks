import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  uri = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get(`${this.uri}/books`);
  }

  getBookById(id) {
    return this.http.get(`${this.uri}/books/${id}`);
  }

  addBook(name, author, language, yearofpublication) {
    const book = {
      name: name,
      author: author,
      language: language,
      yearofpublication: yearofpublication
    };
    return this.http.post(`${this.uri}/books/add`, book);
  }

  updateBook(id, name, author, language, yearofpublication) {
    const book = {
      name: name,
      author: author,
      language: language,
      yearofpublication: yearofpublication
    };
    return this.http.post(`${this.uri}/books/update/${id}`, book);
  }

  deleteBook(id) {
    return this.http.get(`${this.uri}/books/delete/${id}`);
  }
}
