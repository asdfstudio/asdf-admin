import { createSelector } from 'reselect';
import { getISOWeek } from 'date-fns';

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


  function getOrdinalNumber(number) {
    const suffixes = ["st", "nd", "rd"];
    const remainder = number % 10;
    return number + (suffixes[remainder - 1] || "th");
  }
  
  export const getWeeklyVisitorCount = createSelector(
    [getVisitorData],
    (visitorData) => {
      const currentDate = new Date();
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
      // Calculate the week number within the current month.
      const weekNumber = Math.ceil(
        (currentDate.getDate() - startOfMonth.getDate() + 1) / 7
      );
  
      const weekNumberWithSuffix = getOrdinalNumber(weekNumber);
  
      return {
        weekNumber: weekNumberWithSuffix,
        count: visitorData.filter((visitor) => {
          const visitorDate = new Date(visitor.timestamp);
          return (
            visitorDate >= startOfMonth && visitorDate.getMonth() === currentDate.getMonth()
          );
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

  export const getLast30DaysVisitors = createSelector(
    [getVisitorData],
    (visitorData) => {
      const currentDate = new Date();
      const last30Days = [];
      
      for (let i = 0; i < 30; i++) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - i);
        const day = date.getDate();
        const month = date.getMonth() === currentDate.getMonth() ? currentDate.toLocaleString('en-US', { month: 'short' }) : date.toLocaleString('en-US', { month: 'short' });
        const label = `${month} ${day}`;
        const count = visitorData.filter((visitor) => {
          const visitorDate = new Date(visitor.timestamp);
          return (
            visitorDate.getDate() === date.getDate() &&
            visitorDate.getMonth() === date.getMonth() &&
            visitorDate.getFullYear() === date.getFullYear()
          );
        }).length;
  
        last30Days.unshift({ month: label, count, anotherCount: count });
      }
  
      return last30Days;
    }
  );

  export const getLastCustomDaysVisitors = (selectedDays) => createSelector(
    [getVisitorData],
    (visitorData) => {
      const currentDate = new Date();
      const last30Days = [];
      
      for (let i = 0; i < selectedDays; i++) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - i);
        const day = date.getDate();
        const month = date.getMonth() === currentDate.getMonth() ? currentDate.toLocaleString('en-US', { month: 'short' }) : date.toLocaleString('en-US', { month: 'short' });
        const label = `${month} ${day}`;
        const count = visitorData.filter((visitor) => {
          const visitorDate = new Date(visitor.timestamp);
          return (
            visitorDate.getDate() === date.getDate() &&
            visitorDate.getMonth() === date.getMonth() &&
            visitorDate.getFullYear() === date.getFullYear()
          );
        }).length;
  
        last30Days.unshift({ month: label, count, anotherCount: count });
      }
  
      return last30Days;
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

export const previousYearVisitors = createSelector(
  [getVisitorData],
  (visitorData) => {
    const currentDate = new Date();
    const previousYearData = {
      year: currentDate.getFullYear() - 1,
      count: 0,
    };
    const currentYearData = {
      year: currentDate.getFullYear(),
      count: 0,
    };

    const currentYear = currentDate.getFullYear();

    for (let i of visitorData) {
      const visitorDate = new Date(i.timestamp);
      const visitorYear = visitorDate.getFullYear();

      if (visitorYear === currentYear-1) {
        previousYearData.count++;
      } else if (visitorYear === currentYear) {
        currentYearData.count++;
      }
    }

    return [previousYearData, currentYearData];
  }
);