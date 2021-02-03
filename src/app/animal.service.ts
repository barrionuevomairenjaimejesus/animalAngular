import { Injectable } from "@angular/core";
import { MessageService } from "./message.service";
import { HttpClient } from "@angular/common/http";
import { Animal } from "./animal";

@Injectable({
  providedIn: "root"
})
export class AnimalService {
  private url = "https://5ff8115c10778b0017042c2b.mockapi.io/animal";

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getAnimalesApi() {
    this.messageService.add("Mostrando nuestros animales");
    return this.http.get(this.url);
  }

  /** PUT: update the animal by ID on the server */
  updateAnimal(doc: any) {
    console.log("en update");
    console.log(doc);
    const urlId = `${this.url}/${doc.id}`;
    return this.http.put(urlId, doc);
  }

  /** DELETE: delete the animal by Id from the server */
  deleteAnimal(animal: Animal) {
    // const id = typeof animal === "number" ? animal : animal.id;
    const urlId = `${this.url}/${animal.id}`;
    return this.http.delete(urlId);
  }
  /** POST: add a new animal to the server */
  addAnimal(doc: any) {
    return this.http.post(this.url, doc);
  }

  /** GET animal by id. Will 404 if id not found */
  getAnimal(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.get(url);
  }
}
