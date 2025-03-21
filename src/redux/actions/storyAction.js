import axios from "axios";

export const baseUrl = "https://story-creator-3b90d-default-rtdb.firebaseio.com/story.json";

export const FETCH_STORY_REQ = "FETCH_STORY_REQ";
export const FETCH_STORY = "FETCH_STORY";
export const FETCH_STORY_FAILURE = "FETCH_STORY_FAILURE";

export const POST_STORY_REQ = "POST_STORY_REQ";
export const POST_STORY = "POST_STORY";
export const POST_STORY_FAILURE = "POST_STORY_FAILURE"

export const EDIT_STORY_REQ = "EDIT_STORY_REQ";
export const EDIT_STORY_SUCCESS = "EDIT_STORY_SUCCESS";
export const EDIT_STORY_FAILURE = "EDIT_STORY_FAILURE";

export const fetchStory = () => async(dispatch) =>{
    dispatch({type:FETCH_STORY_REQ});
    try{
      const res = await axios.get(baseUrl)
      const data = res.data;
      const stories = data ? Object.entries(data).map(([id,val]) => ({
        id, ...val
    
      })) : [];
      console.log("API Response:",res.data)
      dispatch({type:FETCH_STORY,payload:stories})
    }catch(err){
        console.error("error in fetching story:",err)
        dispatch({type:FETCH_STORY_FAILURE,payload:err.message})
    }
};


export const postStory = ({title,description,author}) => async(dispatch) =>{
    dispatch({type:POST_STORY_REQ});
    const newStory = {
      title, description,
      createdBy:author,
      contributions:[
        {
         sentence:description,
         contributedBy:author,
         contributedAt:new Date().toISOString() 
        },
      ],
      createdAt: new Date().toISOString()
    };
    try{
      const res = await axios.post(baseUrl,newStory);
      dispatch({type:POST_STORY,payload:res.data}) 
      dispatch(fetchStory()); 
    }catch(err){
        console.error("Error in posting Story:",err)
        dispatch({type:POST_STORY_FAILURE,payload:err.message})
    }
};


export const editStory = (id,currentStory,contribution,author) => async(dispatch) =>{
  dispatch({type:EDIT_STORY_REQ});
  try{
      const updatedContribution = [
        ...(currentStory.contributions || []),
        {
          sentence:contribution,
          contributedBy:author,
          contributedAt: new Date().toISOString(),
        }
      ];
      const res = await axios.patch(`https://story-creator-3b90d-default-rtdb.firebaseio.com/story/${id}.json`,{
         contributions: updatedContribution
      })
      dispatch({type:EDIT_STORY_SUCCESS,payload:{id,contributions:updatedContribution}});
      dispatch(fetchStory()); 

  }catch(err){
    console.error("Error in getting story data:",err);
    dispatch({type:EDIT_STORY_FAILURE,payload:err.message})
  }
}


