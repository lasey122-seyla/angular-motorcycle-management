import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Motorcycle } from './models/motorcycle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  title = 'Motorcycle Management System';

  motorcycles: Motorcycle[] = [];

  // Form state
  newBrand = '';
  newModel = '';
  newPrice: number | null = null;

  // Edit state
  editingId: number | null = null;
  editBrand = '';
  editModel = '';
  editPrice: number | null = null;

  ngOnInit() {
    this.loadMotorcycles();
  }

  // Load data from LocalStorage
  loadMotorcycles() {
    const savedData = localStorage.getItem('motorcycles');
    if (savedData) {
      this.motorcycles = JSON.parse(savedData);
    } else {
      // Default initial data if localStorage is empty
      this.motorcycles = [
        { id: 1, brand: 'Honda', model: 'Dream 125', price: 2500 },
        { id: 2, brand: 'Yamaha', model: 'NVX 155', price: 3100 },
      ];
      this.saveToLocalStorage();
    }
  }

  // Helper method to save state
  saveToLocalStorage() {
    localStorage.setItem('motorcycles', JSON.stringify(this.motorcycles));
  }

  addMotorcycle() {
    if (this.newBrand && this.newModel && this.newPrice) {
      this.motorcycles.push({
        id: Date.now(),
        brand: this.newBrand,
        model: this.newModel,
        price: this.newPrice,
      });
      this.saveToLocalStorage();

      // Reset inputs
      this.newBrand = '';
      this.newModel = '';
      this.newPrice = null;
    }
  }

  deleteMotorcycle(id: number) {
    this.motorcycles = this.motorcycles.filter((b) => b.id !== id);
    this.saveToLocalStorage();
  }

  startEdit(bike: Motorcycle) {
    this.editingId = bike.id;
    this.editBrand = bike.brand;
    this.editModel = bike.model;
    this.editPrice = bike.price;
  }

  cancelEdit() {
    this.editingId = null;
  }

  updateMotorcycle() {
    if (this.editingId && this.editBrand && this.editModel && this.editPrice) {
      const idx = this.motorcycles.findIndex((b) => b.id === this.editingId);
      if (idx !== -1) {
        this.motorcycles[idx] = {
          id: this.editingId,
          brand: this.editBrand,
          model: this.editModel,
          price: this.editPrice,
        };
        this.saveToLocalStorage();
      }
      this.cancelEdit();
    }
  }
}
