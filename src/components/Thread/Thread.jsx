import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, selectPost } from "../../redux/reducers/postSlice";
import { useState } from 'react';
import { useEffect } from 'react';
import { isEmpty } from '../../utils/utils';
import Card from '../Card/Card';


const Thread = () => {

    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const { posts, loading } = useSelector(selectPost);
    
    useEffect(() => {
      if (loadPost) {
        dispatch(fetchPost())
        setLoadPost(false)
      }
    }, [loadPost, dispatch]);
    
    return (
        <div>
            <ul>
                {!isEmpty(posts) && posts.map((post) => {
                    return <Card post={post} loadingStatus={loading} key={uuid()}/>
                })}
            </ul>
        </div>
    );
};

export default Thread;