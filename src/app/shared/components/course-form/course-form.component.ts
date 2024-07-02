import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormGroup,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {

  courseForm!: FormGroup;
  nextId = 1;  // Initialize ID counter

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.courseForm = this.fb.group({
      title: this.fb.control('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      description : this.fb.control('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      author: this.fb.control('', [
        Validators.minLength(2), 
        Validators.pattern('[a-zA-Z0-9]*')
      ]),
      authors: this.fb.array([]),
      duration: this.fb.control(0, [
        Validators.required,
        Validators.min(0)
      ])
    })
  }
  onFormSubmit() {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
      this.courseForm.reset();
      this.authors.clear();
      // TODO: Implement authentication logic here
    } else {
      alert('Form is not valid');
      this.courseForm.markAllAsTouched(); 
    }
  }

  addAuthor(id: number) {
    
    //TODO: add author to course authors list and remove in Authors list
    console.log(id);

  }

  deleteAuthor(id: number){
    //TODO: Remove author from course authors list and shows in Authors list
    console.log(id);

  }

  createAuthor() {
    const newAuthor = this.courseForm.get('author');
    if (newAuthor?.valid && newAuthor.value.length > 2) {
      const authorFormGroup = this.fb.group({
        id: this.nextId++,  // Assign current ID and increment the counter
        name: newAuthor.value,
      });
      this.authors.push(authorFormGroup);
      newAuthor.reset();  // Reset the new author name input
    }
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
}
