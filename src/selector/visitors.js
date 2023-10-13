import { createSelector } from 'reselect';

export const getVisitorData = (state) => state.visitor.visitor;

export const getTodayVisitorCount = createSelector(
    [getVisitorData],
    (visitorData) => {
      const currentDate = new Date();
      const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDate);
  
      return {
        count: visitorData.filter((visitor) => {
          const visitorDate = new Date(visitor.timestamp);
          return (
            visitorDate.getDate() === currentDate.getDate() &&
            visitorDate.getMonth() === currentDate.getMonth() &&
            visitorDate.getFullYear() === currentDate.getFullYear()
          );
        }).length,
        dayName,
      };
    }
  );

  export const getWeeklyVisitorCount = createSelector(
    [getVisitorData],
    (visitorData) => {
      const currentDate = new Date();
      const startOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      );
  
      const weekNumber = Math.ceil(
        (currentDate.getDate() - startOfWeek.getDate() + 1) / 7
      );
  
      return {
        weekNumber,
        count: visitorData.filter((visitor) => {
          const visitorDate = new Date(visitor.timestamp);
          return visitorDate >= startOfWeek;
        }).length,
      };
    }
  );
  
export const getMonthlyVisitorCount = createSelector(
  [getVisitorData],
  (visitorData) => {
    const currentDate = new Date();
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);

    return {
      count: visitorData.filter((visitor) => {
        const visitorDate = new Date(visitor.timestamp);
        return (
          visitorDate.getMonth() === currentDate.getMonth() &&
          visitorDate.getFullYear() === currentDate.getFullYear()
        );
      }).length,
      monthName,
    };
  }
);

export const getLast7DaysVisitors = createSelector(
  [getVisitorData],
  (visitorData) => {
    const currentDate = new Date();
    const last7Days = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      const year = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
      const count = visitorData.filter((visitor) => {
        const visitorDate = new Date(visitor.timestamp);
        return (
          visitorDate.getDate() === date.getDate() &&
          visitorDate.getMonth() === date.getMonth() &&
          visitorDate.getFullYear() === date.getFullYear()
        );
      }).length;

      last7Days.unshift({ year, count });
    }

    return last7Days;
  }
);

export const getLast12MonthsVisitors = createSelector(
  [getVisitorData],
  (visitorData) => {
    const currentDate = new Date();
    const last12MonthsData = [];
    
    for (let i = 0; i < 12; i++) {
      const year = currentDate.getFullYear();
      const monthName = currentDate.getMonth();
      const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
      const count = visitorData.filter((visitor) => {
        const visitorDate = new Date(visitor.timestamp);
        return (
          visitorDate.getMonth() === monthName &&
          visitorDate.getFullYear() === year
        );
      }).length;
      
      last12MonthsData.push({ month, count });
      
      currentDate.setMonth(monthName - 1);
    }
    
    return last12MonthsData.reverse();
  }
);

  