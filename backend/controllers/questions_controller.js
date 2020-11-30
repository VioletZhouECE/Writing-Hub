const models = require('../models/index');
const { Op } = require('sequelize');

//return n questions written in the requested language in chronological order 
//this is not a controller, just used internally by getFeedsByLanguage
exports.getnQuestionsByLanguage =  (n) => {
    const perPage = n? n:5;
    return async (req, res, next) => {
        try{
            const lastPostId = req.query.lastQuestionId;
    
            //retrieve languageId
            const language = await models.Language.getLanguageByName(req.query.languageName);
    
            //get createdAt for lastPostId
            let offset = 0;
            if (lastPostId != ''){
                const lastPost = await models.Question.findOne({where:{'id' : lastPostId}});
                const lastCreatedAt = lastPost.createdAt;
                //get the offset based on lastCreatedAt
                offset = await models.Question.count({where:{'createdAt' : {[Op.lte]: lastCreatedAt}, LanguageId:language.id}});
            }
    
            //retrieve post data
            //eager loading is used
            const {count, rows} = await models.Question.findAndCountAll({distinct: true, col: 'id', order : [['createdAt', 'ASC']], offset: offset, limit: perPage, where: {LanguageId:language.id}, include:[models.User, models.Tag]});
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
            next(err);
        };
    }
}

//get a single question by id
exports.getQuestion = async (req, res, next) => {
    try{
        const question = await models.Question.findOne({where:{id: req.params.questionId}, include:[models.User]});
        if (!question){
            let err = new Error(`the journal with journalId: ${questionId} does not exist in our database`);
            err.statusCode = 500;
            throw err;
        }

        let learnLanguageData = await question.User.getLearnLanguage();
        const tags = await question.getTags();
        const tagNames = tags.map(tag=>tag.dataValues.name);

        let response = {
            id: question.id,
            createdAt: question.createdAt,
            updatedAt: question.updatedAt,
            username: question.User.username,
            avatarUrl: question.User.avatarUrl,
            learnLanguage: learnLanguageData[0].name,
            title: question.title,
            body: question.body,
            tags: tagNames,
            upvotesCount: question.upvoteCount
        }
        res.status(200).json(response);
    } catch(err){
        next(err);
    }
}

exports.postQuestion= async (req, res, next) => {
    try{
        const language = await models.Language.getLanguageByName(req.body.language);

        //get a list of tag ids
        const tagIds = await Promise.all(req.body.tags.map(tag=> models.Tag.getTagIdByName(tag)));

        //create a question
        const question = await models.Question.create({
            UserId: req.userId,
            LanguageId: language.id,
            title: req.body.title,
            body: req.body.body
        });
        
        //set associations between tags and questions
        await Promise.all(tagIds.map(tagId=> question.setTags(tagId)));

        let response = {msg: "publish success"};
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}

exports.updateQuestion = async (req, res, next) => {
}

exports.deleteQuestion = async (req, res, next) => {
}