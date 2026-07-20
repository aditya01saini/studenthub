import { STUDENT_SCORE } from "./constants.js";

export const calculateStudentScore = ({
  projects = 0,
  notes = 0,
}) => {

  return (
    (projects * STUDENT_SCORE.PROJECT) +
    (notes * STUDENT_SCORE.NOTE)
  );

};