import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { AnimalService } from "../animal.service";
import { Animal } from "../animal";

@Component({
  selector: "app-grafico01",
  templateUrl: "./grafico01.component.html",
  styleUrls: ["./grafico01.component.css"]
})
export class Grafico01Component implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: "column"
    },
    title: {
      text: "Peso animal"
    },
    xAxis: {
      categories: []
    },

    series: [
      {
        type: "column",
        data: []
      }
    ],
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "#303030"
      }
    }
  };

  constructor(private animalService: AnimalService) {}

  ngOnInit() {
    //  this.getAnimalesApi();
    this.getMisDatos();
  }

  getMisDatos() {
    this.animalService.getAnimalesApi().subscribe(
      result => {
        const misDatos: any = result;
        const dataSeries = misDatos.map((x: any) => x.peso);
        const dataCategorias = misDatos.map((x: any) => x.nombre);
        this.chartOptions.series[0]["data"] = dataSeries;
        this.chartOptions.xAxis["categories"] = dataCategorias;
        Highcharts.chart("grafico01", this.chartOptions);
      },
      error => console.log(error)
    );
  }
}
