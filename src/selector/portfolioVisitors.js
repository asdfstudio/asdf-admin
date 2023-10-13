import { createSelector } from 'reselect';

export const getVisitorData = (state) => state.visitor.portfolioVisitor;

export const getTop3Portfolios = createSelector([getVisitorData], (visitorData) => {
  const sortedData = [...visitorData].sort((a, b) => b.visitor_count - a.visitor_count);

  const top3Portfolios = sortedData.slice(0, 3);

  const names = top3Portfolios.map((portfolio) => portfolio.portfolio_name);
  const counts = top3Portfolios.map((portfolio) => portfolio.visitor_count);

  return [names, counts];
});

export const getTop3PortfoliosByVisitorCount = createSelector([getVisitorData], (visitorData) => {

  const sortedData = [...visitorData].sort((a, b) => b.total_time_spent - a.total_time_spent);
  const top3Data = sortedData.slice(0, 5);
  const formattedData = top3Data.map((item) => ({
    month: item.portfolio_name,
    count: item.total_time_spent,
  }));

  return formattedData;
});
  