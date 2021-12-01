import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./PostDetail.scss";

const PostDetail  = () =>{
    let history = useHistory();
    let {id} = useParams()
    const [post,setPost] = useState()
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        const ourRequest = axios.CancelToken.source()
        async function fetchData() {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`,{
                cancelToken: ourRequest.token, // <-- 2nd step
              })
            const item = (response && response.data) ? response.data : {} ;
            setPost(item)
            setLoading(false)
            } catch (error) {
                if(axios.isCancel(error)){
                    console.log('Request Cancel :',error.message)
                }
            }  
          }
        setTimeout(()=>{
              fetchData();
            },2000);
            return () => {
                ourRequest.cancel('Cancel by user') // <-- 3rd step
              }
              // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
    const handleBack = () =>{
        history.push("/post")
    }
        return(
            <>
                <div className = "post-detail-container">
                <h1 className = "post-id">Post Detail ID : {id}</h1>
            {loading === false && post &&  
            <>
                <h3 className = "post-title">Title : {post.title}</h3>
                <p className = "post-body">{post.body}</p>
                </>
            }
                </div>
            {loading === true && 
            <div className = "loading-wrap" >
                <span className ="loading"> Loading...</span>
            </div>
            }
                <button className = "back-button" onClick = {()=>handleBack()}>  &laquo; Back</button>
            </>
        )

}

export default PostDetail;