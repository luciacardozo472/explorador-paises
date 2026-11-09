import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Countries } from '../services/countries';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  regiones = [
    { valor: 'Africa', nombre: 'África' },
    { valor: 'Americas', nombre: 'América' },
    { valor: 'Asia', nombre: 'Asia' },
    { valor: 'Europe', nombre: 'Europa' },
    { valor: 'Oceania', nombre: 'Oceanía' },
  ];
  regionActual = 'Americas';
  paises: any[] = [];
  cargando = true;
  error = false;

  constructor(
    private countriesService: Countries,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarRegion();
  }

  cargarRegion() {
    this.cargando = true;
    this.error = false;
    this.countriesService.getByRegion(this.regionActual).subscribe({
      next: (data) => {
        this.paises = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = true;
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  cambiarRegion(event: any) {
    this.regionActual = event.detail.value;
    this.cargarRegion();
  }
}