const express = require("express");
const router = new express.Router();
const List = require('./fakeDb');
const ExpressError = require("./expressError");
const { response } = require("./app");

router.get('/', function(req, res, next){
    try{
        return res.json(List);
    } catch(e){
        return next(e);
    }
});


router.post('/', function(req, res, next){
    try{
        const newItem = { name : req.query.name, price : req.query.price };
        List.push(newItem);
        return res.status(201).json({'added' : newItem});
    } catch(e){
        return next(e);
    }
});

router.get('/:name', function(req, res, next) {
    try {
        let item = null;
        List.forEach(shopItem => {
            if(shopItem.name == req.params.name){
                item = shopItem;
            }
        });
        if(item != null){
            return res.json(item);
        }else{
            next();
        }
    } catch(e){
        return next(e);
    }
})

router.patch('/:name', function(req, res, next) {
    try {
        let item = null;
        List.forEach(shopItem => {
            if(shopItem.name == req.params.name){
                item = shopItem;
            }
        });
        if(item != null){
            if(req.query.name != undefined && req.query.name != ''){
                item['name'] = req.query.name;
            }
            if(req.query.price != undefined && req.query.price != ''){
                item['price'] = req.query.price;
            }
            return res.json(item);
        }else{
            next();
        }
    } catch(e){
        return next(e);
    }
})

router.delete('/:name', function(req, res, next) {
    try {
        let index = null;
        for(let i = 0; i < List.length; i++){
            if(List[i].name == req.params.name){
                index = i;
            }
            console.log(List[i], req.params.name, index, List.length);
        }
        if(index != null){
            List.splice(index, 1);
            return res.json({message: 'deleted'});
        }else{
            next();
        }
    } catch(e){
         next(e);
    }
});

module.exports = router;