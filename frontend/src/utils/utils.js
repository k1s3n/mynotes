
// Funktion för att capitalizera varje ord
export const capitalizeTitle = (title) => {
    return title
      .split(' ')  // Dela upp titeln i ord baserat på mellanslag
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalizera första bokstaven och behåll resten
      .join(' ');  // Sätt ihop orden igen
  };


  