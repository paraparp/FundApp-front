import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MorningstarService {

  constructor(private http: HttpClient) { }

  URL = 'https://lt.morningstar.com/api/rest.svc/klr5zyak8x/security/screener?outputType=json&securityDataPoints=SecId%7CName%7CPriceCurrency%7CLegalName%7CClosePrice%7CCategoryName%7CAnalystRatingScale%7CStarRatingM255%7CQuantitativeStarRating%7CReturnD1%7CReturnW1%7CReturnM1%7CReturnM3%7CReturnM6%7CReturnM0%7CReturnM12%7CReturnM36%7CReturnM60%7CReturnM120%7CFeeLevel%7CManagerTenure%7CMaxDeferredLoad%7CInitialPurchase%7CFundTNAV%7CEquityStyleBox%7CBondStyleBox%7CAverageMarketCapital%7CAverageCreditQualityCode%7CEffectiveDuration%7CMorningstarRiskM255%7CAlphaM36%7CBetaM36%7CR2M36%7CStandardDeviationM36%7CSharpeM36%7CTrackRecordExtension&term='

  getSymbs(isin: string) {
    let url = URL + isin;
    console.log(url)
    return this.http.get(url);
  }
  getSymbs2(isin: string) {
    let url = 'https://lt.morningstar.com/api/rest.svc/klr5zyak8x/security/screener?outputType=json&securityDataPoints=SecId%7CName%7CPriceCurrency%7CLegalName%7CClosePrice%7CCategoryName%7CAnalystRatingScale%7CStarRatingM255%7CQuantitativeStarRating%7CReturnD1%7CReturnW1%7CReturnM1%7CReturnM3%7CReturnM6%7CReturnM0%7CReturnM12%7CReturnM36%7CReturnM60%7CReturnM120%7CFeeLevel%7CManagerTenure%7CMaxDeferredLoad%7CInitialPurchase%7CFundTNAV%7CEquityStyleBox%7CBondStyleBox%7CAverageMarketCapital%7CAverageCreditQualityCode%7CEffectiveDuration%7CMorningstarRiskM255%7CAlphaM36%7CBetaM36%7CR2M36%7CStandardDeviationM36%7CSharpeM36%7CTrackRecordExtension&term=' + isin
    console.log(url)
    return this.http.get(url);
  }

  getSymbolInfo(isin: string) {
    let url = `https://lt.morningstar.com/api/rest.svc/klr5zyak8x/security/screener?outputType=json&securityDataPoints=isin%7COngoingCharge%7CSecId%7CName%7CPriceCurrency%7CLegalName%7CClosePrice%7CCategoryName%7CReturnD1%7CReturnW1%7CReturnM1%7CReturnM3%7CReturnM6%7CReturnM0%7CReturnM12%7CReturnM36%7CReturnM60%7CReturnM120%7CFeeLevel%7CMaxDeferredLoad%7CInitialPurchase&term=IE00B03HCZ61`
    console.log(url)
    return this.http.get(url);

  }

  getHistorical(msCode) {
    let url = `http://tools.morningstar.es/api/rest.svc/timeseries_price/2nhcdckzon?startdate=2019-01-01&id=${msCode}&frequency=weekly&outputType=JSON&enddate=2999-12-30`
    console.log(url)
    return this.http.get(url);
  }

  getHistoricalIsin() {
    let url = 'http://tools.morningstar.es/api/rest.svc/timeseries_price/2nhcdckzon?id=IE00B03HCZ61&idtype=Isin&outputType=jSON'

    console.log(url)
    return this.http.get(url);
  }
}
