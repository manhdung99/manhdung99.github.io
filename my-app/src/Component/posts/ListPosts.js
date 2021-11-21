import React, { useState,useEffect } from 'react'
import axios from 'axios' 
import { useHistory } from 'react-router'
import './ListPosts.scss'
import { Modal } from 'react-bootstrap'
const ListPost = () =>{
    const history = useHistory()
    const [posts,setPosts] = useState([])
    const [loading,setLoading] = useState(true)
    const [show, setShow] = useState(false);
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
      
    })

    useEffect(() => {
        const ourRequest = axios.CancelToken.source()
        async function fetchData() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                cancelToken: ourRequest.token, // <-- 2nd step
              })
            const items = (response && response.data) ? response.data.slice(0,9) : [] ;
            setPosts(items.reverse())
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
        },[])
        

        const handleShowDetail = (id)=>{
          history.push(`/post/${id}`)
        }
        const handleAddPost = async ({content,title}) =>{
            let data = {
              title: title,
              body: content,
              userId: 1,
            }
        let res = await axios.post('https://jsonplaceholder.typicode.com/posts',data)
              console.log(res.data)
              let dataSimple = [res.data,...posts]
              setPosts(dataSimple)
        setShow(false)
        }
      return (
        <>
      <Modal show={show} onHide={handleClose}>
        <div className = "add-new-wrap">
        <h2 className = "add-new-title">---ADD NEW BLOG---</h2>
        <div className = "input-data" >
        <label className ="title-input" >Title</label>
        <input
        value = {title} onChange = {(event)=>{setTitle(event.target.value)}}
        type = "text" placeholder = "Nhập title"/>
        </div>
        <div className = "input-data">
        <label className = "content-input">Content</label>
        <input
        value = {content} onChange = {(event)=>{setContent(event.target.value)}}
        type = "text" placeholder = "Nhập Content" />
        </div>
        <button className = "btn-add-new"
        onClick = {() => handleAddPost({content,title})}
        >Submit</button>
        </div>
      </Modal>
        <h2 className = 'title' >List Post</h2>
        <div className = 'add-button-wrap'>
        <button className = 'add-button'
        onClick={handleShow}
        >Add Post</button>
        </div>
        <div className = 'post-container'>
            {loading === false && posts && posts.length > 0 && posts.map(post =>(
                <div key = {post.id} className = "post">
                    <h3 className = "post-title">{post.title}</h3>
                    <p className = "post-body">{post.body}</p>
                    <div className = "button-wrap" >
                    <button className = "btn post-button-detail"
                    onClick = {()=>handleShowDetail(post.id)}
                    >Show Detail</button>
                    <button className = "btn post-button-delete">Delete</button>
                    </div>            
                    </div>
            ))}
            {loading === true && 
            <span className ="loading"> Loading...</span>
            }
        </div>
        </>

      )
}

export default ListPost;


