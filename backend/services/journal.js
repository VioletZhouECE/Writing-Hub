const models = require('../models/index');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');
const {viewNames} = require('../queries/viewnames')

class Journal {
    constructor(){
        this.userModel = models.User;
        this.journalModel = models.Journal;
        this.languageModel = models.Language;
        this.sequelize = models.sequelize;
    }

    async getnJournalsByLanguage(n, languageName, lastPostId){
        try{
            //retrieve languageId
            const language = await this.languageModel.getLanguageByName(languageName);
    
            //get createdAt for lastPostId
            let offset = 0;
            if (lastPostId != ""){
                const lastPost = await this.journalModel.findOne({where:{'id' : lastPostId}});
                const lastCreatedAt = lastPost.createdAt;
                //get the offset based on lastCreatedAt
                offset = await this.journalModel.count({where:{'createdAt' : {[Op.lte]: lastCreatedAt}, LanguageId:language.id}});
            }
    
            //retrieve post data
            const {count, rows} = await this.journalModel.findAndCountAll({order : [['createdAt', 'ASC']], offset: offset, limit: n, where: {LanguageId:language.id}, include:models.User});
            const journals = rows;
    
            
            const posts = journals.map(journal=>(
                    {   
                        type: "journal",
                        id: journal.id,
                        username: journal.User.username,
                        avatarUrl: journal.User.avatarUrl,
                        createdAt: journal.createdAt,
                        title: journal.title,
                        body: journal.body,
                        count: journal.viewsCount
                    }
                ))

            return {totalJournals: count, journals: posts};
        } catch(err) {
            throw err;
        };
    }

    //for simplicity, we only return fixed amount of results (n = 10)
    async getnJournalsBySearchString(searchString){
        const n = 10;
        console.log(await this.getnJournalsFromIndexedView(n, searchString));
    }

    async getnJournalsFromIndexedView(n, searchString){
        //get journals from all indexedView
        const results= await Promise.all(viewNames.map(view=>{
            const query = `SELECT id, title, body, UserId, rank
                        FROM CONTAINSTABLE(${view}, (title, body), '${searchString}', ${n}) AS TBL
                            INNER JOIN journals
                            ON journals.id = TBL.[KEY]
                        ORDER BY RANK`;
            return this.sequelize.query(query, { type: QueryTypes.SELECT });
        }));

        //select n with the highest rank
        let flatten = [];
        results.forEach(result=>{flatten = flatten.concat(result);});
        flatten = flatten.sort((a,b)=>(a.rank>b.rank)?-1:1).slice(0,n);

        return flatten;
    }

    async postJournal(userId, postLanguage, title, body, comment){
        try{
            const language = await this.languageModel.getLanguageByName(postLanguage);
            await this.journalModel.create({
                UserId: userId,
                LanguageId: language.id,
                title: title,
                body: body,
                comment: comment
            });
            return Promise.resolve();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Journal;