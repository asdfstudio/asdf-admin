const FormattedDate = ({ mysqlDateTimeString }) => {
    const date = new Date(mysqlDateTimeString);
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };
    
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  
    return <span>{formattedDate}</span>;
  };
  
  export default FormattedDate;
  