import { useDispatch, useSelector } from "react-redux";
import { fetchPost, selectPost } from "../../redux/reducers/postSlice";
import { useState } from 'react';
import { useEffect } from 'react';
import { isEmpty } from '../../utils/utils';
import Card from '../Card/Card';


const Thread = () => {

    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    const { posts } = useSelector(selectPost);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true)
        };
    };
    
    useEffect(() => {
      if (loadPost) {
        dispatch(fetchPost(count));
        setLoadPost(false);
        setCount(count + 5);
      };

      window.addEventListener('scroll', loadMore);
      return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch, count]);
    
    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts[0]) && posts.map((post) => {
<<<<<<< HEAD
                    return <Card post={post} key={post._id}/>
=======
                    return <Card post={post} key={post._id} />
>>>>>>> 5558686ce2d8f672bff54c9d9f49a4141ab0f48b
                })}
            </ul>
        </div>
    );
};

export default Thread;