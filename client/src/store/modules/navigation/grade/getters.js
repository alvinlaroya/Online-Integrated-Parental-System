export const allGrades = (state) => state.allGrades;
export const average = (state) => {
  let grades = [];
  state.allGrades.map((item) => grades.push(item.grade));
  const sum = grades.reduce((a, b) => a + b, 0);
  return sum / grades.length;
};
