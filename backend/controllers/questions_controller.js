const models = require('../models/index');

exports.getnQuestionsByLanguage =  (n) => {
    const perPage = n? n:5;
    return async (req, res, next) => {
        try{
            const lastPostId = req.query.lastPostId;
    
            //retrieve languageId
            const language = await models.Language.getLanguageByName(req.query.languageName);
    
            //get createdAt for lastPostId
            let offset = 0;
            if (lastPostId != ""){
                const lastPost = await models.Question.findOne({where:{'id' : lastPostId}});
                const lastCreatedAt = lastPost.createdAt;
                //get the offset based on lastCreatedAt
                offset = await models.Question.count({where:{'createdAt' : {[Op.lte]: lastCreatedAt}}})+1;
            }
    
            //retrieve post data
            const {count, rows} = await models.Question.findAndCountAll({order : [['createdAt', 'ASC']], offset: offset, limit: perPage, where: {LanguageId:language.id}, include:models.User});
            const questions = rows;
    
            //send response
            let response;
            response = {
                totalPosts: count,
                posts: questions.map(question=>(
                    {   
                        type: "question",
                        id: question.id,
                        username: question.User.username,
                        title: question.title,
                        body: question.body,
                        upvoteCount: question.upvoteCount
                    }
                ))
            }
            res.status(200).json(response); 
        } catch(err) {
            next(err);
        };
    }
}

exports.getQuestion = async (req, res, next) => {
}

exports.postQuestion= async (req, res, next) => {
    try{
        const language = await models.Language.getLanguageByName(req.body.language);
        await models.Question.create({
            UserId: req.userId,
            LanguageId: language.id,
            title: req.body.title,
            body: req.body.body
        });
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