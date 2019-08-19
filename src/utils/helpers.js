export const getInitials = (name, delimeter = " ") => {
  if (name) {
    var array = name.split(delimeter);

    switch (array.length) {
      case 1:
        return array[0].charAt(0).toUpperCase();

        break;
      default:
        return (
          array[0].charAt(0).toUpperCase() +
          array[array.length - 1].charAt(0).toUpperCase()
        );
    }
  }
  return false;
};
