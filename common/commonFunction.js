let commonFunction = {};

commonFunction.changeDateToSqlDate = (excelDate) =>
{
    let dateString = excelDate.split("-");
    if(dateString.length == 3)
    {
        return dateString[2] + "-" + dateString[0] + "-" + dateString[1];
    }
    else
    {
        return "";
    }
}

module.exports = commonFunction;