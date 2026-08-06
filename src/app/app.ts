import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { StorageService } from './storage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Definicion de la interfaz
export interface Medicamento {
  nombre: string;
  categoria: string;
  stock: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  // Arreglo de datos
  public listaMedicamentos: Medicamento[] = [];

  // Inyección de servicios creados por storage.ts
  private storageService = inject(StorageService);
  private cdr = inject(ChangeDetectorRef);

  // Variables vinculadas a las cajas de texto
  public nuevoNombre: string = '';
  public nuevaCategoria: string = '';
  public nuevoStock: string = '';

  ngOnInit(): void {
    // Usamos la misma clave 'inventario_drogueria'
    const cargados = this.storageService.getObject<Medicamento[]>('inventario_drogueria');
    if (cargados) {
      this.listaMedicamentos = cargados;
      this.cdr.detectChanges();
    }
  }

  // Método Agregar e insertar con .push()
  agregarMedicamento(): void {
    if (this.nuevoNombre.trim() !== '' && this.nuevaCategoria.trim() !== '') {
      const nuevo: Medicamento = {
        nombre: this.nuevoNombre,
        categoria: this.nuevaCategoria,
        stock: this.nuevoStock,
      };

      // Inserción con el método .push
      this.listaMedicamentos.push(nuevo);

      // Persistencia - Guardar array actualizando el localStorage
      this.storageService.setObject('inventario_drogueria', this.listaMedicamentos);

      // Limpiar variables correctamente
      this.nuevoNombre = '';
      this.nuevaCategoria = '';
      this.nuevoStock = '';

      // Notificar a Angular que redibuje la tabla
      this.cdr.detectChanges();
    }
  }
}
