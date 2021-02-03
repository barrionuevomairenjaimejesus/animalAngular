import { Component, OnInit, Input } from "@angular/core";
import { Animal } from "../animal";
import { AnimalService } from "../animal.service";
import { MessageService } from "../message.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-animal-detail",
  templateUrl: "./animal-detail.component.html",
  styleUrls: ["./animal-detail.component.css"]
})
export class AnimalDetailComponent implements OnInit {
  // @Input() and @Output() allow Angular to share data between the parent context and child directives or components
  animal: Animal;

  constructor(
    private animalService: AnimalService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getAnimal();
  }
  save(pesoP: string): void {
    const doc = {
      id: this.animal.id,
      nombre: this.animal.nombre,
      peso: parseInt(pesoP)
    };
    this.animalService.updateAnimal(doc).subscribe(() => this.goBack());
  }
  /*
  Para recuperar el documento por el Id reicibido como parámetro
  */
  getAnimal(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.animalService.getAnimal(id).subscribe(animal => {
      const animalTmp: any = animal;
      this.animal = animalTmp;
    });
  }
  goBack(): void {
    this.location.back();
  }
}
