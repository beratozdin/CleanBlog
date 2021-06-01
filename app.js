const express = require('express');
const path=require('path');
const ejs=require('ejs');
const methodOverride = require('method-override');
const mongoose=require('mongoose');

const fileUpload = require('express-fileupload');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();

mongoose.connect('mongodb+srv://berat:XH9cSeuo1Nhfgppw@cluster0.k7u7k.mongodb.net/clean-blog-db?retryWrites=true&w=majority', {

  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false,
}).then(() => {
  console.log("Db connected");
}).catch((err) => {
  console.log(err);
})



app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload());  
app.use(methodOverride('_method',{

  methods:['POST','GET']
}));

app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost );
app.delete('/posts/:id', postController.deletePost);

  
app.get('/about', pageController.getAboutPage);
  
app.get('/add', pageController.getAddPage);

app.get('/posts/edit/:id', pageController.getEditPage);


const port= process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
