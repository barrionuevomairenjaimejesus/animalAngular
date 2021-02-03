import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnimalesComponent } from "./animales/animales.component";
import { AnimalDetailComponent } from "./animal-detail/animal-detail.component";
import { Grafico01Component } from "./grafico01/grafico01.component";

const routes: Routes = [
  { path: "animales", component: AnimalesComponent },
  { path: "grafico", component: Grafico01Component },
  { path: "detail/:id", component: AnimalDetailComponent },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
