import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { promise } from 'protractor';

@Injectable({
    providedIn: 'root'
})

export class SearchService {
    searchProvidersUrl = "./assets/search-providers.json";
    queryURLs: any = {
        "Hacker news" : "https://hn.algolia.com/api/v1/search",
        "Wiki": "https://en.wikipedia.org/w/api.php"
    }
    queryParams: any = {

    }
    constructor(private _http: HttpClient) {
        
    }

    getSearchProviders(): Promise<any> {
        return this._http.get(this.searchProvidersUrl).toPromise();
    }

    getSearchResults(provider: string, searchString: string) {
        let baseUrl = this.queryURLs[provider];
        let queryparams;
        if (provider === "Wiki") {
            queryparams = {
                action: "opensearch",
                format: "json",
                origin: "*",
                search: searchString
            };
        } else if (provider === "Hacker news") {
            queryparams = {
                query: searchString
            }
        }
        return this._http.get(baseUrl, {
            params: queryparams
        });
    }
}