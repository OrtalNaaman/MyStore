import { Injectable } from '@angular/core';
import { GirlsSizes, BabiesSizes } from '../models/enums';
import { HttpClient } from '@angular/common/http';
import { StoreItem } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class StoreDataService {
  babiesSizes: Array<string> = [
    BabiesSizes.NewBorn,
    BabiesSizes.SixMonth,
    BabiesSizes.OneYear,
    BabiesSizes.EighteenMonth,
    BabiesSizes.TwoYears,
  ];
  girlsSizes: Array<string> = [
    GirlsSizes.Four,
    GirlsSizes.Six,
    GirlsSizes.Eight,
    GirlsSizes.Ten,
    GirlsSizes.Twelve,
    GirlsSizes.Fourteen,
    GirlsSizes.Sixteen,
    GirlsSizes.Eighteen,
  ];

  constructor(private service: HttpClient) {}

  getStoreItems() {
    return this.service.get<StoreItem[]>(
      'https://localhost:7207/api/StoreItems'
    );
  }

  getStoreItem(id: number) {
    return this.service.get<StoreItem>(
      `https://localhost:7207/api/StoreItem/${id}`
    );
  }

  getBabiesSizes(): Array<string> {
    return this.babiesSizes;
  }

  getGirlsSizes(): Array<string> {
    return this.girlsSizes;
  }
}
