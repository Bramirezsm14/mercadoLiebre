const fs = require('fs')
const path = require('path')
/**Aca esta la conversion de la B.D a un objeto de JS */
let productsJson = path.join(__dirname,'../data/productsDataBase.json');
let arrayProducts = JSON.parse(fs.readFileSync(productsJson, 'utf-8'));//es un archivo js que leemos con fs  el archivo  data base json 
 



/**Este es el transforamdor de miles */
const toThousand = n => n.toString().replace( /\B(?=(\d{3})+(?!\d))/g,"." );

const controller = {
    /**El home donde se muestra las ultimas visitas y las ofertas */
    home:function(req, res, next) {
         
        res.render('index',{arrayProducts, toThousand});
      },
      /**Aca se muestra todo los productos de la base de datos */
    product:function(req, res){
        res.render('products',{arrayProducts})
    },
    /**Se muestra el detalle del producto, con los botonos de 'comprar','modificar'y'borrar' */  
    productsDetalle:function(req, res){
        let id = req.params.id;
        let productoEncontrado = arrayProducts.find(unProdu => {return id == unProdu.id});
        if(id == productoEncontrado.id){
        res.render('detail',{
            toThousand,
            idPro:productoEncontrado.id,
            namePro:productoEncontrado.name,
            descriPro:productoEncontrado.description,
            precioPro:toThousand(productoEncontrado.price),
            imagenPro:productoEncontrado.image,
            descuentoPro: productoEncontrado.discount,
            precioConDescuento:toThousand(productoEncontrado.price - (productoEncontrado.price * productoEncontrado.discount / 100))
        })
        }else{
            res.send('producto no esta añadido')
        }
    },
    delete:function(req,res){
        let id = req.params.id;
        arrayProducts.splice(arrayProducts.indexOf(id))
        let deleteJson= JSON.stringify(arrayProducts)
        fs.writeFileSync(productsJson,deleteJson) /* OJO que esto va a la base de datos si lo descomentas y lo usas. */
           res.render('delete')
       },
       
         /**Aca el ejs donde se puede modificar los productos */
    edit:function(req, res){
        let id = req.params.id;
        let produEncontrado = arrayProducts.find(producto => {return producto.id == id})
        res.render('edit',{
            produId:produEncontrado.id,
            produName: produEncontrado.name
        })},
    

    editar:function(req,res){
        
            let id = req.params.id;
           
         arrayProducts.map((nuevoArray)=>{
              if(nuevoArray.id==id){
                  nuevoArray.name=req.body.name
                  nuevoArray.description=req.body.description
                  nuevoArray.price=req.body.price
                  nuevoArray.discount=req.body.discount
                  nuevoArray.category=req.body.category
                 
                 /* console.log (nuevoArray)
                  console.log(arrayProducts)*/
            }
          })
             fs.writeFileSync(productsJson,JSON.stringify(arrayProducts));
             res.redirect('/products')  
            
     },


    /**Aca se mostrara el formulario donde se creara el producto */
    productCreate:function(req,res){
        res.render('productsCreate')
    },
    /**Aca es donde llega el producto con todos sus datos del body para guardar en la B.S */
    create:function(req, res,next){
        let productCreado = {
            id:arrayProducts [arrayProducts.length - 1].id + 1,
            name: req.body.name,
            price: req.body.price,
            discount:req.body.discount,
            category:req.body.category,
            disription:req.body.discription,
            image:req.files[0].filename
            }
            /*console.log(req.files)
            console.log(req.files[0])
            console.log(req.files[0].filename)*/
        
        /**Aca estoy uniendo el producto nuevo con el arrayProducts */
        arrayProducts = [...arrayProducts,productCreado];
        fs.writeFileSync(productsJson,JSON.stringify(arrayProducts,null,""))
       res.redirect('/')
    }
    
}

module.exports = controller;
                      
    
    

   


        
        
        








       
         
    
    
    
        
    


   
   

