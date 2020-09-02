const router = express.Router();

//GET /posts
router.get('/', getPosts);

//GET /posts/:postId
router.get('/:postId', getPost);

//POST /posts
router.post('/', postPost);

//PUT /posts/:postId
router.put('/:postId', updatePost);

//DELETE /posts/:postId
router.delete('/:postId', deletePost);