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

commonFunction.getUniqueData = (data) =>
{
    if(data)
    {
        const dataString = [...new Set(data.map(JSON.stringify))]
        const dataObj = dataString.map(JSON.parse)
        return dataObj
    }
    else
    {
        return data
    }
}

module.exports = commonFunction;