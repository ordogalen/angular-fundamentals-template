import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  @Input() courses!: any[]; // TODO: Make it proper course object
  @Input() editable!: boolean;

  @Output() showCourse = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<void>();
  @Output() deleteCourse = new EventEmitter<void>();

  handleShowCourse() {
    console.log("Not yet implemented");
  }
  
  handleEditCourse(course: any) {
    console.log("Not yet implemented: ", course);
  }
  
  handleDeleteCourse(course: any) {
    console.log("Not yet implemented: ", course);
  }
}
