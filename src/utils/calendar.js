/**
 * Utility to generate calendar subscription/event links.
 */

export const generateCalendarLinks = (event) => {
  if (!event) return null;

  const title = encodeURIComponent(event.title || "DevMeet Event");
  const description = encodeURIComponent(event.description || "");
  const location = encodeURIComponent(event.location || "Online");
  
  // Use event_date or date.
  const rawDate = event.event_date || event.date;
  if (!rawDate) return [];

  const startDate = new Date(rawDate);
  // Default to 2 hours duration
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const formatToICS = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  };

  const startStr = formatToICS(startDate);
  const endStr = formatToICS(endDate);

  return [
    {
      name: "Google Calendar",
      url: `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${description}&location=${location}&dates=${startStr}/${endStr}`,
    },
    {
      name: "Outlook",
      url: `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${title}&body=${description}&location=${location}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}`,
    },
    {
      name: "Yahoo",
      url: `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${title}&st=${startStr}&dur=0200&desc=${description}&in_loc=${location}`,
    }
  ];
};
