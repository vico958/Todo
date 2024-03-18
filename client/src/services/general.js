export const handlePasswordKeyPress = (event) => {
    // Check if the pressed key is a space
    if (event.key === " ") {
      // Prevent the default action (typing a space)
      event.preventDefault();
    }
  };