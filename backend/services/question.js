const models = require('../models/index');
const { Op } = require('sequelize');

class Question {
    constructor(){
        this.userModel = models.User;
        this.questionModel = models.Question;
        this.languageModel = models.Language;
    }

    async getnQuestionsByLanguage(n, languageName, lastPostId){
        try{
            //retrieve languageId
            const language = await this.languageModel.getLanguageByName(languageName);
    
            //get createdAt for lastPostId
            let offset = 0;
            if (lastPostId != ''){
                const lastPost = await this.questionModel.findOne({where:{'id' : lastPostId}});
                const lastCreatedAt = lastPost.createdAt;
                //get the offset based on lastCreatedAt
                offset = await this.questionModel.count({where:{'createdAt' : {[Op.lte]: lastCreatedAt}, LanguageId:language.id}});
            }
    
            //retrieve post data
            //eager loading is used
            const {count, rows} = await this.questionModel.findAndCountAll({distinct: true, col: 'id', order : [['createdAt', 'ASC']], offset: offset, limit: n, where: {LanguageId:language.id}, include:[models.User, models.Tag]});
            const questions = rows;
            
            const posts = questions.map(question=>(
                    {   
                        type: "question",
                        id: question.id,
                        username: question.User.username,
                        avatarUrl: question.User.avatarUrl,
                        title: question.title,
                        createdAt: question.createdAt,
                        body: question.body,
                        tags: question.Tags.map(tag=>tag.name),
                        count: question.upvoteCount
                    }
                ))
                
            return {totalQuestions: count, questions: posts};
        } catch(err) {
            throw err;
        };
    }
}

module.exports = Question;