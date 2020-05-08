import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from './services/search.services';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  constructor(private searchService: SearchService) { }
  
  private resultsSubscriber: Subscription;
  searchClicked: boolean = false;
  searchText: string;
  provider: string;
  options: string[];
  results: any[] = [];

  ngOnInit(): void {
      this.searchService.getSearchProviders().then((data: any) => {
        this.options = data.providers;
        if (this.options.length > 0)
          this.provider = this.options[0];
      }).catch((err) => {
        console.log("Error");
        // On failure default add 2 search providers
        this.options = [
            "Hacker news",
            "Wiki"
        ];
        this.provider = this.options[0];
      })
  }

  ngOnDestroy(): void {
    if (this.resultsSubscriber) 
      this.resultsSubscriber.unsubscribe();
  }

  providerChange() {
    this.searchClicked = false;
    this.results = [];
  }

  onSearch(): void {
    this. resultsSubscriber = this.searchService.getSearchResults(this.provider, this.searchText)
                            .subscribe((results: any) => {
                              console.log(results);
                              this.results = this.getFormattedResults(results && results.hits || results);
                            },
                            (err) =>{
                              console.log(err);
                              throw new Error("Error occured while getting results");
                              this.results = [];
                            },
                            () => {
                              this.searchClicked = true;
                            })
  }

  getFormattedResults(results: any[]) : any[] {
    return results.map((result) => {
      let data: any = {};
      data.title = result.title || result;
      data.author = result.author || result;
      data.url = result.url || result;
      data.linkRequired = result.url ? true : false;
      return data;
    });
  }

}
