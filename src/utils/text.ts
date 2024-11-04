
export const capitalizeFirstLetter = (str: string): string => {
 if (str.length === 0) return str; // Handle empty string case
 return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatLabel = (firstName: string, lastName: string): string => {
 const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
 const formattedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
 
 // Return the formatted label
 return `${formattedFirstName} ${formattedLastName}`; // Customize as needed
};

export const formatParticipationData = (data: Array<{ firstName: string; lastName: string }>): string[] => {
 return data.map(participant => formatLabel(participant.firstName, participant.lastName));
};
