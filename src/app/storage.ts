import { Injectable, inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private platFormId = inject(PLATFORM_ID);

  //Guardar datos en el almacenamiento local
  setObject(key: string, value: any): void {
    if (isPlatformBrowser(this.platFormId)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  //Recuperar datos del LocalStorage
  getObject<T>(Key: string): T | null {
    if (isPlatformBrowser(this.platFormId)) {
      const data = localStorage.getItem(Key);
      return data ? JSON.parse(data) as T : null;
    }
    return null;
  }
}
