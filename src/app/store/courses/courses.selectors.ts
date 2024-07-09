import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState, coursesFeatureKey } from "./courses.reducer";

const selectCoursesFeature =
  createFeatureSelector<CoursesState>(coursesFeatureKey);

export const isAllCoursesLoadingSelector = createSelector(
  selectCoursesFeature,
  (state: CoursesState) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
  selectCoursesFeature,
  (state: CoursesState) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
  selectCoursesFeature,
  (state: CoursesState) => state.isSingleCourseLoading
);

export const getAllCourses = createSelector(
  selectCoursesFeature,
  (state: CoursesState) => state.allCourses
);

export const getCourse = createSelector(
  selectCoursesFeature,
  (state: CoursesState) => state.course
);

export const getErrorMessage = createSelector(
  selectCoursesFeature,
  (state: CoursesState) => state.errorMessage
);
