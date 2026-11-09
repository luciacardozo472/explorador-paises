import { Component, OnInit } from '@angular/core';
import { Countries } from '../services/countries';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  paises: any[] = [];
  paisesFiltrados: any[] = [];
  cargando = true;
  error = false;

  constructor(private countriesService: Countries) {}

  ngOnInit() {
    this.cargarPaises();
  }

  cargarPaises() {
    this.cargando = true;
    this.error = false;
    this.countriesService.getAll().subscribe({
      next: (data) => {
        this.paises = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        this.paisesFiltrados = this.paises;
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      },
    });
  }

  buscar(event: any) {
    const texto = (event.target.value || '').toLowerCase();
    this.paisesFiltrados = this.paises.filter((p) =>
      p.name.common.toLowerCase().includes(texto)
    );
  }
}