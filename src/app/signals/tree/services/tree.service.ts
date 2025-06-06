import { Injectable, signal } from '@angular/core';

export interface ListItem {
  id: number;
  name: string;
  value: number;
  children: number[];
}

@Injectable({ providedIn: 'root' })
export class TreeService {
  private maxDepth = 150;

  private _data = signal<ListItem[]>([]);

  public readonly data = this._data.asReadonly();

  constructor() {
    this.generateData();
  }

  public get depth() {
    return this.maxDepth;
  }

  private generateData(): void {
    const arr: ListItem[] = [];
    for (let i = 0; i < this.maxDepth; i++) {
      arr.push({
        id: i,
        name: `Node ${i}`,
        value: Math.floor(Math.random() * 1000),
        children: i < this.maxDepth - 1 ? [i + 1] : [],
      });
    }
    this._data.set(arr);
  }

  public updateItem(level: number): void {
    const currentData = this.data();
    if (level < currentData.length) {
      const updated = [...currentData];
      updated[level] = {
        ...updated[level],
        value: Math.floor(Math.random() * 1000),
      };
      this._data.set(updated);
    }
  }

  public getItem(level: number): ListItem {
    return this.data()[level];
  }
}
