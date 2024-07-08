import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Author } from "@app/services/model/course.model";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: Date;
  @Input() duration!: number;
  @Input() authors!: Author[];
  @Input() editable: boolean | null = false;

  @Output() clickOnShow = new EventEmitter<void>();

  showCourse() {
    this.clickOnShow.emit();
  }
}
