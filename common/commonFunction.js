let commonFunction = {};
let fs = require('fs')
const mime = require('mime');
const commondb = require('./commonDatabaseQuery');
let path = require('path')

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

commonFunction.singleFileUpload = (fileObject, destinationBaseFolder, fileName, addiFolder) =>
{
    return new Promise((resolve, reject)=>{
        try{
            let addiFolderCreated = 1
            let newpath = destinationBaseFolder
            if(addiFolder != '')
            {
                let folders = addiFolder.split('/')
                let i = 0
                for(; i < folders.length; i++)
                {
                    try 
                    {
                        if (!fs.existsSync(newpath + '/' + folders[i])) 
                        {
                            fs.mkdirSync(newpath + '/' + folders[i]);
                            newpath = newpath + '/' + folders[i]
                        }
                        else
                        {
                            newpath = newpath + '/' + folders[i]
                        }
                    } 
                    catch (err) 
                    {
                        console.error(err);
                    }
                }
                if(parseInt(i) != folders.length)
                {
                    for( ; i < folders.length; i++)
                    {
                        try 
                        {
                            if (!fs.existsSync(folders[i])) 
                            {
                                fs.rmdirSync(folders[i]);
                            }
                        } 
                        catch (err) 
                        {
                            console.error(err);
                        }
                    }
                    addiFolderCreated = 0
                }
            }
            if(addiFolderCreated == 1)
            {
                try
                {
                    let file = fileObject
                        let filepath = file.logoFile.filepath;
                        newpath = newpath + '/';
                        newpath += fileName;
                        console.log(newpath,filepath)
                        fs.copyFile(filepath, newpath, function (err) {
                            if(err)
                            {
                                throw err 
                            }
                            fs.unlinkSync(filepath)
                            return  resolve(true)
                        });
                }
                catch(e)
                {
                    throw e
                }
            }
        }
        catch(e)
        { 
            console.log(e)
        }
    });
}
commonFunction.multiFileUpload = (fileObject, destinationBaseFolder, fileName, addiFolder) =>
{
    return new Promise((resolve, reject)=>{
        try{
            let addiFolderCreated = 1
            let newpath = destinationBaseFolder
            if(addiFolder != '')
            {
                let folders = addiFolder.split('/')
                let i = 0
                for(; i < folders.length; i++)
                {
                    try 
                    {
                        if (!fs.existsSync(newpath + '/' + folders[i])) 
                        {
                            fs.mkdirSync(newpath + '/' + folders[i]);
                            newpath = newpath + '/' + folders[i]
                        }
                        else
                        {
                            newpath = newpath + '/' + folders[i]
                        }
                    } 
                    catch (err) 
                    {
                        console.error(err);
                    }
                }
                if(parseInt(i) != folders.length)
                {
                    for( ; i < folders.length; i++)
                    {
                        try 
                        {
                            if (!fs.existsSync(folders[i])) 
                            {
                                fs.rmdirSync(folders[i]);
                            }
                        } 
                        catch (err) 
                        {
                            console.error(err);
                        }
                    }
                    addiFolderCreated = 0
                }
            }
            if(addiFolderCreated == 1)
            {
                try
                {
                    let file = fileObject
                        let filepath = file.filepath;
                        newpath = newpath + '/';
                        newpath += fileName;
                        console.log(newpath,filepath)
                        fs.copyFile(filepath, newpath, function (err) {
                            if(err)
                            {
                                throw err 
                            }
                            fs.unlinkSync(filepath)
                            return  resolve(true)
                        });
                }
                catch(e)
                {
                    throw e
                }
            }
        }
        catch(e)
        { 
            console.log(e)
        }
    });
}

commonFunction.deleteUploadedFile = (destinationBaseFolder, fileName, addiFolder) =>
{
    return new Promise((resolve, reject)=>{
        try{
            let newpath = destinationBaseFolder
            if(addiFolder != '')
            {
                let folders = addiFolder.split('/')
                let i = 0
                for(; i < folders.length; i++)
                {
                    try 
                    {
                        if (fs.existsSync(newpath + '/' + folders[i])) 
                        {
                            fs.unlinkSync(newpath + '/' + folders[i] + '/' + fileName)
                            let dir = newpath + '/' + folders[i]
                            fs.readdir(dir, (err, files) => {
                                if(files.length == 0)
                                {
                                    fs.rmdirSync(newpath + '/' + folders[i]);
                                }
                            });                            
                            newpath = newpath + '/' + folders[i]
                            return resolve(true)
                        }
                        else
                        {
                            return resolve("File not exist")
                        }
                    } 
                    catch (err) 
                    {
                        console.error(err);
                    }
                }
            }
        }
        catch(e)
        { 
            console.log(e)
        }
    });
}

commonFunction.getFileUploaded = (destinationBaseFolder, fileName, addiFolder) =>
{
    return new Promise((resolve, reject)=>{
        try{
            let newpath = destinationBaseFolder
            if(addiFolder != '')
            {
                let folders = addiFolder.split('/')
                let i = 0
                for(; i < folders.length; i++)
                {
                    try 
                    {
                        if (fs.existsSync(newpath + '/' + folders[i] + '/' + fileName)) 
                        {
                            let file = fs.readFileSync(newpath + '/' + folders[i] + '/' + fileName, 'base64')
                            newpath = newpath + '/' + folders[i] + '/' + fileName
                            const mime_type = mime.getType(newpath)
                            file = `data:${mime_type};base64,` + file
                            return resolve(file)
                           // return resolve(newpath)
                        }
                        else
                        {
                            newpath = newpath + '/' + folders[i]
                            return resolve("")
                        }
                    } 
                    catch (err) 
                    {
                        console.error(err);
                    }
                }
            }
        }
        catch(e)
        { 
            console.log(e)
        }
    });
}

commonFunction.getFileUploadedPath = (destinationBaseFolder, fileName, addiFolder) =>
{
    return new Promise((resolve, reject)=>{
        try{
            let newpath = destinationBaseFolder
            if(addiFolder != '')
            {
                let folders = addiFolder.split('/')
                let i = 0
                for(; i < folders.length; i++)
                {
                    try 
                    {
                        if (fs.existsSync(newpath + '/' + folders[i] + '/' + fileName)) 
                        {
                            let file = fs.readFileSync(newpath + '/' + folders[i] + '/' + fileName, 'base64')
                            newpath = newpath + '/' + folders[i] + '/' + fileName
                            const mime_type = mime.getType(newpath)
                            //file = `data:${mime_type};base64,` + file
                            return resolve({path:newpath, mime : mime_type, fileName : fileName, file: file})
                        }
                        else
                        {
                            newpath = newpath + '/' + folders[i]
                            return resolve("")
                        }
                    } 
                    catch (err) 
                    {
                        console.error(err);
                    }
                }
            }
        }
        catch(e)
        { 
            console.log(e)
        }
    });
}

commonFunction.schoolUserHaveAuth = (curriculumUuid, schoolId, userId) =>
{
    return new Promise((resolve, reject) =>
    {
        try
        {
            if(curriculumUuid.length > 1)
            {
                commondb.getCurriculumSchool(curriculumUuid).then(
                    res => {
                        if(res)
                        {
                            commondb.getUserSchoolId(userId, res.school_id).then(userSchool => {
                                if(userSchool)
                                {
                                    
                                }
                                else
                                {
                                    return -1
                                }
                            })
                        }
                    }
                )
            }
            else
            {

            }
        }
        catch(e)
        { 
            console.log(e)
        }
    });
}

module.exports = commonFunction;