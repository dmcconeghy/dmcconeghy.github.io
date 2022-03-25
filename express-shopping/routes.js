
const Item = require('./item')
const express = require("express");

const router = express.Router();


/** GET /items - this should render a list of shopping items.
 * [
 * {“name”: “popsicle”, “price”: 1.45}, 
 * {“name”:”cheerios”, “price”: 3.40}
 * ] 
*/

router.get('', (req, res, next) => {
    try {
        return res.json({items: Item.findAll() })
    } catch(err) {
        return next(err)
    }

});

/** POST /items - this route should accept NEW JSON data and add it to the shopping list.
 * 
 * {“name”:”popsicle”, “price”: 1.45} => 
 *  {“added”: {“name”: “popsicle”, “price”: 1.45}}
 * 
*/

router.post('', (req, res, next) => {

    try {
        let newItem = new Item(req.body.name, req.body.price)
        return res.json({ "item": newItem })
    } catch(err) {
        return next(err)
    }

  });
  
/** GET /items/:name - this route should display a single item’s name and price.
 * 
 * {“name”: “popsicle”, “price”: 1.45}
*/

router.get('/:name', (req, res, next) => {

    try {
        let foundItem = Item.find(req.params.name);
        return res.json({ "item": foundItem})
    } catch(err) {
        return next(err)
    }

  });
  
/** PATCH /items/:name, this route should modify a single item’s name and/or price.
 * {“name”:”new popsicle”, “price”: 2.45} =>
 * {“updated”: {“name”: “new popsicle”, “price”: 2.45}}
*/

router.patch('/:name', (req, res, next) => {

    try {
        let foundItem = Item.update(req.params.name, req.body);
        return res.json( { "item": foundItem} )
    } catch(err) {
        return next(err)
    }

  });



/** DELETE /items/:name - this route should allow you to delete a specific item from the array. 
 * 
 * {message: “Deleted”}
 * 
*/

router.delete('/:name', (req, res, next) => {

    try {
        Item.remove(req.params.name)
        return res.json({ message: 'Deleted'})
    } catch(err) {
        return next(err)
    }


});


module.exports = router;