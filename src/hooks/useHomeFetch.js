//this a custom hook
import { useState, useEffect, useRef } from 'react'
//Api
import API from '../API';

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchMovies = async (page, searchTerm = "") => {
        try{
            setError(false)
            setLoading(true)

            const movies = await API.fetchMovies(searchTerm, page)
       

            setState(prev => ({
                ...movies, 
                results:
                page > 1 ? [...prev.results, ...movies] : [...movies.results]
            }))

        }catch(error){
            setError(true)
        }

        setLoading(true)
    }

    //initial and search
    useEffect(() => {
        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm])


    return {state, loading, error, searchTerm, setSearchTerm}
}