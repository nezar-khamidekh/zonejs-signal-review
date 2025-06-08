import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ListItem {
  id: number;
  name: string;
  value: number;
  children: number[];
}

@Injectable({ providedIn: 'root' })
export class TreeService {
  private maxDepth = 300;
  private data: ListItem[] = [];
  private dataSubject = new BehaviorSubject<ListItem[]>([]);

  public data$ = this.dataSubject.asObservable();

  constructor() {
    this.generateData();
  }

  public get depth() {
    return this.maxDepth;
  }

  private generateData(): void {
    this.data = [];
    for (let i = 0; i < this.maxDepth; i++) {
      this.data.push({
        id: i,
        name: `Node ${i}`,
        value: Math.floor(Math.random() * 1000),
        children: i < this.maxDepth - 1 ? [i + 1] : [],
      });
    }
    this.dataSubject.next([...this.data]);
  }

  public updateItem(level: number): void {
    if (level < this.data.length) {
      this.data[level].value = Math.floor(Math.random() * 1000);
      this.dataSubject.next([...this.data]);
    }
  }

  public getItem(level: number): ListItem {
    return this.data[level];
  }
}
