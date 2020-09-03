const express = require("express");
const router = new express.Router();
const List = require('./fakeDb');
const ExpressError = require("./expressError");

router.get('/', function(req, res, next){
    try{
        return res.json(List);
    } catch(e){
        return next(e);
    }
});