const size = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1450px",
  desktop: "1980px",
};

export const darkTheme = {
  header: "rgb(25, 29, 36)",
  input: "#141517",
  body: "rgb(13, 17, 23)",
  text: "white",
  button: "white",
  buttonHover: "#e0dcdc",
  buttonText: "black",
  card: "#333",
  border: "1px solid rgb(166, 173, 187)",
  cardFontColor: "rgb(166, 173, 187)",
  cardBorder: "1px solid #222;",
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width:${size.mobile}) and (max-width:${size.tablet})`,
  laptop: `( min-width :${size.tablet}) and (max-width:${size.laptop})`,
  desktop: `( min-width :${size.desktop}) `,
};

export const whiteTheme = {
  header: "white",
  input: "#f5f7f7",
  body: "white",
  text: "black",
  button: "#141313",
  buttonHover: "#3d3838",
  buttonText: "white",
  card: "#FAFAFA",
  border: "1px solid black",
  cardFontColor: "black",
  cardBorder: "1px solid rgb(229, 231, 235)",
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width:${size.mobile}) and (max-width:${size.tablet})`,
  laptop: `( min-width :${size.tablet}) and (max-width:${size.laptop})`,
  desktop: `( min-width :${size.desktop}) `,
};
