const fs = require('fs');
class docPath{
    constructor()
    {
        try 
        {
            let folderNames = ["uploads","uploads/school"]
            for(let i = 0; i < folderNames.length; i++)
            {
                if (!fs.existsSync(folderNames[i])) 
                {
                    fs.mkdirSync(folderNames[i]);
                }
            }
        } 
        catch (err) 
        {
            console.error(err);
        } 
    }

    getName(code){
    if (code) 
	{
		switch (code) 
		{
			case 'root': return 'uploads'; 
			case 'school': return 'uploads/school'; 
			default:
				return "unknown folder"
		}
}
    }
}

module.exports = docPath