/** TMDB gender codes: 0 not specified, 1 female, 2 male, 3 non-binary (B16: 0 and 3 used to read "Female"). */
export const genderLabel = (gender: number | null | undefined): string => {
  switch (gender) {
    case 1:
      return 'Female';
    case 2:
      return 'Male';
    case 3:
      return 'Non-binary';
    default:
      return 'Not specified';
  }
};