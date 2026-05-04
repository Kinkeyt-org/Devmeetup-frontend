import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-4MEQT6S44Q");
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const trackEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};