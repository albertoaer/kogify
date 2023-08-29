import type { ChartData } from "chart.js";

export interface StatValue1D<T> {
  label: string,
  value: number,
  ref: T
}

export class Stats1D<T> {
  private constructor(private readonly data: StatValue1D<T>[] = []) { }

  static buildFrom<T>(inputs: [string, T][]): Stats1D<T> {
    const accumulated = new Map<string, StatValue1D<T>>();
    for (const [label, ref] of inputs) {
      const acc = accumulated.get(label);
      if (acc) acc.value += 1;
      else accumulated.set(label, { label, ref, value: 1 });
    }
    const result = [...accumulated.values()];
    result.sort((a, b) => b.value - a.value);
    return new Stats1D<T>(result);
  }

  get count(): number {
    return this.data.length;
  }

  at(idx: number): StatValue1D<T> | undefined {
    return this.data.at(idx);
  }

  collect(): T[] {
    return this.data.map(x => x.ref);
  }

  avg(): number {
    return Math.round(this.data.reduce((a, b) => a + b.value, 0) / this.data.length);
  }

  slice(min: number, max: number): Stats1D<T> {
    if (min > 100 || min < 0 && max > 100 || max < 0) throw new Error('percentage must be between 0 and 100');
    const length = this.data.length;
    return new Stats1D<T>(
      this.data.slice((length - 1) * ((100 - max) / 100), (length - 1) * ((100 - min) / 100))
    );
  }

  top(num: number): Stats1D<T> {
    return new Stats1D<T>(
      this.data.slice(0, num)
    );
  }

  last(num: number): Stats1D<T> {
    return new Stats1D<T>(
      this.data.slice(this.data.length - 1 - num, this.data.length - 1)
    );
  }

  filter(predicate: (value: StatValue1D<T>, stats: Stats1D<T>) => boolean): Stats1D<T> {
    return new Stats1D<T>(
      this.data.filter(x => predicate(x, this))
    );
  }

  map<K>(transform: (value: StatValue1D<T>, stats: Stats1D<T>) => [string, K][]): Stats1D<K> {
    return Stats1D.buildFrom(
      this.data.map(x => transform(x, this)).flat()
    );
  }

  group(labelOfMany: string): Stats1D<T[]> {
    const grouped: StatValue1D<T[]>[] = [];
    for (const item of this.data) {
      const last = grouped.at(-1);
      if (last?.value == item.value) {
        last.ref.push(item.ref);
        last.label = `${last.ref.length} ${labelOfMany}`;
      } else {
        grouped.push({ ...item, ref: [item.ref] });
      }
    }
    return new Stats1D<T[]>(
      grouped
    );
  }

  getChartData(label: string): ChartData {
    return {
      labels: this.data.map(x => x.label),
      datasets: [
        {
          label: label,
          data: this.data.map(x => x.value),
        }
      ]
    };
  }
}