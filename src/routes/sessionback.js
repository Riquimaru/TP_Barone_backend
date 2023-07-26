// const prodManager = new dbProdManager()

// sessionRouter.get('/register', (req, res) => {
//     res.render('register', {})
// })

// sessionRouter.post('/register', async (req, res) => {
//     let user = req.body
//     let userFound = await getByEmail(user.email);
//     if (userFound) {
//         res.render('register-error', {})
//     }
//     user.password = createHash(user.password)
//     let result = await createUser(user)
//     console.log(result)
//     res.render('login', {})
// })

// sessionRouter.get('/login', (req, res) => {
//     res.render('login', {})
// })

// sessionRouter.post('/login', async (req, res) => {
//     let user = req.body;
//     let products;
//     let result = await getByEmail(user.email);
//     let data;

//     if (!user || !isValidPassword(result, user.password)) {
//         res.render('login-error', {})
//     }
//     products = await prodManager.getProducts()
//     data = {
//         product: products.docs,
//         totalPages: products.totalPages,
//         page: products.page,
//         limit: products.limit,
//         hasPrevPage: products.hasPrevPage,
//         prevPage: products.prevPage,
//         hasNextPage: products.hasNextPage,
//         nextPage: products.nextPage
//     }
//     console.log(result)
//     req.session.user = user.email;
//     res.render('products', { user: req.session.user, data })
// })

// sessionRouter.get('/profile', authMiddleware, async (req, res) => {
//     let user = await getByEmail(req.session.user);
//     res.render('datos', { user })
// })

// sessionRouter.get('/logout', (req, res) => {
//     req.session.destroy(error => {
//         res.render('login')
//     })
// })

// sessionRouter.get('/restore', (req, res) => {
//     res.render('restore-password', {})
// })

// sessionRouter.post('/restore', async (req, res) => {
//     let user = req.body;
//     let userFound = await getByEmail(user.email)
//     if (!userFound) {
//         res.render('register', {})
//     } else {
//         let newPassword = createHash(user.password)
//         await updateUserPassword(user.email, newPassword)
//     }
//     res.render('login', {})
// })