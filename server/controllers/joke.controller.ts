import { Request, Response } from 'express'
import fetch from 'node-fetch';

const getRandom = (arr: Array<string>, n: number) => new Array(n).fill(null).map(() => arr[Math.floor(Math.random() * arr.length)]);


export const getJokes = async (req: Request, res: Response) => {
    try {
        const { query = '', categories = '' } = {...req.query};
        
        // split categories by , to create an array;
        const categoryArray = categories.split(',');
        
        const randomCategories = getRandom(categoryArray, 10);

        // If no category or search term is defined get 10 random jokes
        if (query === '' && categories === '') {
            const jokes = await Promise.all([...Array(10)].map(() => fetch(`https://api.chucknorris.io/jokes/random`).then(res => { return res.json() })));
            res.send(jokes);
            return;
        }

        if (query !== '') {            
            const data = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
            const response = await data.json();
            
            if (data.status === 400) throw new Error(response?.message);
            
            const { result } = response;

            console.log(result);
            
            
            // if less then 10 result send result;
            if (result?.length < 10) {
                res.send(result)
                return false;
            }

            // if more then 10 jokes get 10 random jokes from search term;
            const jokes = getRandom(result, 10);
            
            res.send(jokes);
            return;
        }

        // get 10 jokes from random given categories
        const jokes = await Promise.all(randomCategories.map(item => fetch(`https://api.chucknorris.io/jokes/random?category=${item}`).then(res => { return res.json() })));
        res.send(jokes);

    } catch (err) {
        console.log(err);
        res.status(500).send({ err: err.message });
    }
}