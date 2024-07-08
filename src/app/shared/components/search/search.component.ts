import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  @Input() placeholder?: string = "Input text";
  @Output() clickOnShow = new EventEmitter<string>();

  searchTerm: string = "";

  onSearch() {
    this.clickOnShow.emit(this.searchTerm);
  }
}
