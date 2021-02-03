import { Component, OnInit } from "@angular/core";
import { Animal } from "../animal";
import { AnimalService } from "../animal.service";
import { MessageService } from "../message.service";

@Component({
  selector: "app-animales",
  templateUrl: "./animales.component.html",
  styleUrls: ["./animales.component.css"]
})
export class AnimalesComponent implements OnInit {
  animales: Animal[];
  animalesApi = null;
  selectedAnimal: Animal;
  animalTmp: any;

  constructor(
    private animalService: AnimalService,
    private messageService: MessageService
  ) {}

  onSelect(animal: Animal): void {
    this.selectedAnimal = animal;
    this.messageService.add(
      `AnimalesComponent: Selected animal id=${animal.id}`
    );
  }

  getAnimalesApi() {
    this.animalService.getAnimalesApi().subscribe(animales => {
      this.animalesApi = animales;
      this.animales = this.animalesApi;
    });
  }

  delete(animal: Animal): void {
    /* filter crea otro array filtrando los elementos que sean distintos de el "animal" recibido.
    Se trata de que el array en memoria conincida con el server
    */
    this.animales = this.animales.filter(h => h !== animal);
    this.animalService.deleteAnimal(animal).subscribe();
  }

  add(nameP: string, pesoP: string): void {
    const nameV = nameP.trim();
    const pesoV = parseInt(pesoP);
    const newDoc: any = {
      name: nameV,
      peso: pesoV
    };
    this.animalService.addAnimal(newDoc).subscribe(animal => {
      this.animalTmp = animal;
      this.animales.push(this.animalTmp);
    });
  }

  ngOnInit() {
    this.getAnimalesApi();
  }
}
