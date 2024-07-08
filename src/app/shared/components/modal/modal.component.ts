import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Input() title: string = "";
  @Input() message: string = "";
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
