import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';


const protect =  expressAsyncHandler( async (req, res, next) => {

    let token;

    if(
       req.headers.authorization && 
       req.headers.authorization.startsWith('Bearer')
     ){
        
        try {

            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // console.log(decoded);

            req.user = await User.findById(decoded.id).select('-password')

            // console.log(req.user);
            
            next(); 

        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed') 
        }
    }

    if(!token){
        res.status(401)
        throw new Error ('Not authorized, no token' )
    }

});

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as admin')
    }
}



export {protect, isAdmin}