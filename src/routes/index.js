var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller')
var methodOverride = require('method-override')
var multer= require('multer');
var path=require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })


/* GET home page. */
router.get('/', controller.home);
/* *GET muestra todos los productos de la B.D */
router.get('/products', controller.product)
/* GET de products para mostrar por id y categoria*/
router.get('/products/detail/:id', controller.productsDetalle);

/*.*GET muestra la pagina done se modificar un produto*/
router.get('/products/edit/:id', controller.edit)
/*.*PUT sera para modificar un producto*/ 
router.put('/products/edit/:id', controller.editar)

/*.*DELETE sera la ruta para borrar un producto */
router.delete('/products/delete/:id', controller.delete)

/**Aca muestra la pagina de creacion de un producto */
router.get('/products/create', controller.productCreate)
/**Aca por donde pasa la informaion del archivo creado */
router.post('/products/create',upload.any(), controller.create)

module.exports = router;
